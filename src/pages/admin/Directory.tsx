import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import {
  Folder,
  FolderOpen,
  FileText,
  Upload,
  Download,
  Trash2,
  ChevronRight,
  File,
  Image as ImageIcon,
  Loader2,
  RefreshCw,
  Plus,
  Move,
  Eye,
  X,
  CheckCircle,
  Edit2,
  ArrowLeft,
  ArrowUpDown,
  Home
} from "lucide-react";
import { INITIAL_DIRECTORY_STRUCTURE, DirectoryNode } from "../../config/directoryStructure";

type StorageFile = {
  name: string;
  id: string | null;
  updated_at: string | null;
  created_at: string | null;
  last_accessed_at: string | null;
  metadata: {
    size: number;
    mimetype: string;
  } | null;
};

const BUCKET_NAME = "agency_documents";

export default function Directory() {
  const navigate = useNavigate();
  const [activePath, setActivePath] = useState<string>("01_Admin_Legal_Finance");
  const [files, setFiles] = useState<StorageFile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Modals state
  const [previewFile, setPreviewFile] = useState<{ file: StorageFile; url: string } | null>(null);
  const [moveFile, setMoveFile] = useState<StorageFile | null>(null);
  const [isFolderModalOpen, setIsFolderModalOpen] = useState<{ isOpen: boolean; mode: 'create' | 'rename'; targetPath?: string }>({ isOpen: false, mode: 'create' });
  const [folderNameInput, setFolderNameInput] = useState("");
  
  // Custom directory structure state
  const [directoryStructure, setDirectoryStructure] = useState<DirectoryNode[]>(INITIAL_DIRECTORY_STRUCTURE);

  // Expanded folders in sidebar
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(["01_Admin_Legal_Finance"]));

  // Toast State
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Delete Confirm State
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; targetUrl: string; isFolder: boolean } | null>(null);

  // Sorting
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'size'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    fetchFiles(activePath);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePath]);

  // Fetch dynamic complete structure on mount
  useEffect(() => {
    syncDirectoryStructure();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Recursively build a folder tree from Supabase Storage
  const buildTreeFromStorage = async (prefix: string): Promise<DirectoryNode[]> => {
    if (!supabase) return [];
    const { data, error } = await supabase.storage.from(BUCKET_NAME).list(prefix, {
      limit: 200,
      sortBy: { column: 'name', order: 'asc' },
    });
    if (error || !data) return [];
    
    const folders: DirectoryNode[] = [];
    for (const item of data) {
      // Folders have no id and no metadata in Supabase list results
      if (!item.id && !item.metadata && item.name !== '.emptyFolder') {
        const folderPath = prefix ? `${prefix}/${item.name}` : item.name;
        const children = await buildTreeFromStorage(folderPath);
        folders.push({
          id: folderPath.replace(/\//g, '_').toLowerCase(),
          name: item.name,
          type: 'folder',
          path: folderPath,
          children,
        });
      }
    }
    return folders;
  };

  const syncDirectoryStructure = async () => {
    if (!supabase) return;
    try {
      // Build the full tree by recursively walking Supabase Storage prefixes
      const tree = await buildTreeFromStorage('');
      setDirectoryStructure(tree.length > 0 ? tree : INITIAL_DIRECTORY_STRUCTURE);
    } catch(err) {
      console.error(err);
      // Fallback to static structure on error
      setDirectoryStructure(JSON.parse(JSON.stringify(INITIAL_DIRECTORY_STRUCTURE)));
    }
  };

  const handleCreateFolder = async () => {
    if (!folderNameInput.trim() || !supabase) return;
    const target = isFolderModalOpen.targetPath || activePath;
    const newFolderPath = `${target}/${folderNameInput.trim()}`;
    const placeholderPath = `${newFolderPath}/.emptyFolder`;

    try {
      const emptyFile = new Blob([""], { type: "text/plain" });
      const { error } = await supabase.storage.from(BUCKET_NAME).upload(placeholderPath, emptyFile);
      if (error) throw error;
      
      showToast("Folder created successfully");
      setIsFolderModalOpen({ isOpen: false, mode: 'create' });
      setFolderNameInput("");
      fetchFiles(activePath);
      syncDirectoryStructure(); // Refresh sidebar tree
    } catch (err: unknown) {
      showToast((err as Error).message || "Failed to create folder", 'error');
    }
  };

  const confirmDeleteFolder = (folderPath: string) => {
    setDeleteConfirm({ isOpen: true, targetUrl: folderPath, isFolder: true });
  };

  const handleDeleteFolder = async (folderPath: string) => {
    if (!supabase) return;
    
    try {
      // 1. List all files in the folder prefix
      const { data, error } = await supabase.storage.from(BUCKET_NAME).list(folderPath, { limit: 500 });
      if (error) throw error;
      
      // 2. Map to full paths
      const filesToRemove = (data || []).map(f => `${folderPath}/${f.name}`);
      
      // 3. Remove them
      if (filesToRemove.length > 0) {
        const { error: rmError } = await supabase.storage.from(BUCKET_NAME).remove(filesToRemove);
        if (rmError) throw rmError;
      }
      
      showToast("Folder deleted successfully");
      setDeleteConfirm(null);
      syncDirectoryStructure(); // Refresh sidebar tree
      if (activePath.startsWith(folderPath)) {
        setActivePath("01_Admin_Legal_Finance"); // reset path if we deleted active path
      } else {
        fetchFiles(activePath);
      }

    } catch (err: unknown) {
      showToast((err as Error).message || "Failed to delete folder", 'error');
      setDeleteConfirm(null);
    }
  };

  const handleRenameFolder = async () => {
    if (!folderNameInput.trim() || !supabase || !isFolderModalOpen.targetPath) return;
    const oldPath = isFolderModalOpen.targetPath;
    const parts = oldPath.split('/');
    parts.pop(); // remove old name
    const parentPath = parts.join('/');
    const newPath = parentPath ? `${parentPath}/${folderNameInput.trim()}` : folderNameInput.trim();

    try {
      // 1. List all files in old path
      const { data, error } = await supabase.storage.from(BUCKET_NAME).list(oldPath, { limit: 500 });
      if (error) throw error;

      // 2. Move each file
      for (const f of (data || [])) {
        const oldFile = `${oldPath}/${f.name}`;
        const newFile = `${newPath}/${f.name}`;
        await supabase.storage.from(BUCKET_NAME).move(oldFile, newFile);
      }
      
      showToast("Folder renamed successfully");
      setIsFolderModalOpen({ isOpen: false, mode: 'create' });
      setFolderNameInput("");
      syncDirectoryStructure(); // Refresh sidebar tree
      
      if (activePath === oldPath) {
        setActivePath(newPath);
      } else {
        fetchFiles(activePath);
      }
    } catch (err: unknown) {
      showToast((err as Error).message || "Failed to rename folder", 'error');
    }
  };

  const fetchFiles = async (path: string) => {
    if (!supabase) {
      showToast("Supabase client not initialized.", 'error');
      return;
    }
    setIsLoading(true);
    try {
      const { data, error } = await supabase.storage.from(BUCKET_NAME).list(path, {
        limit: 100,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      });

      if (error) throw error;
      
      // Filter out standard empty folder placeholders if any (.emptyFolder)
      const validFiles = (data || []).filter(f => f.name !== ".emptyFolder");
      setFiles(validFiles as unknown as StorageFile[]);
    } catch (err: unknown) {
      console.error("Error fetching files:", err);
      showToast((err as Error).message || "Failed to load files.", 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !supabase) return;

    setIsUploading(true);
    const filePath = `${activePath}/${file.name}`;

    try {
      const { error } = await supabase.storage.from(BUCKET_NAME).upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
      });

      if (error) throw error;
      
      showToast("File uploaded successfully");
      fetchFiles(activePath);
    } catch (err: unknown) {
      console.error("Error uploading file:", err);
      showToast((err as Error).message || "Failed to upload file", 'error');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleFileDownload = async (file: StorageFile) => {
    if (!supabase) return;
    try {
      const filePath = `${activePath}/${file.name}`;
      const { data, error } = await supabase.storage.from(BUCKET_NAME).download(filePath);
      
      if (error) throw error;

      // Create a blob link to download
      const url = URL.createObjectURL(data);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
      showToast("Download started");
    } catch (err: unknown) {
      console.error("Error downloading file:", err);
      showToast((err as Error).message || "Failed to download file", 'error');
    }
  };

  const confirmDeleteFile = (file: StorageFile) => {
    setDeleteConfirm({ isOpen: true, targetUrl: file.name, isFolder: false });
  };

  const handleDeleteFile = async (fileName: string) => {
    if (!supabase) return;

    const filePath = `${activePath}/${fileName}`;
    try {
      const { error } = await supabase.storage.from(BUCKET_NAME).remove([filePath]);
      if (error) throw error;
      showToast("File deleted successfully");
      setDeleteConfirm(null);
      fetchFiles(activePath);
    } catch (err: unknown) {
      console.error("Error deleting file:", err);
      showToast((err as Error).message || "Failed to delete file", 'error');
      setDeleteConfirm(null);
    }
  };

  const executeMoveFile = async (destPath: string) => {
    if (!supabase || !moveFile) return;
    
    const oldPath = `${activePath}/${moveFile.name}`;
    const newPath = `${destPath}/${moveFile.name}`;

    try {
      const { error } = await supabase.storage.from(BUCKET_NAME).move(oldPath, newPath);
      if (error) throw error;
      
      showToast("File moved successfully");
      setMoveFile(null);
      fetchFiles(activePath);
    } catch (err: unknown) {
      showToast((err as Error).message || "Failed to move file", 'error');
    }
  };

  const handlePreviewFile = async (file: StorageFile) => {
    if (!supabase) return;
    try {
      const filePath = `${activePath}/${file.name}`;
      const { data, error } = await supabase.storage.from(BUCKET_NAME).download(filePath);
      
      if (error) throw error;

      const url = URL.createObjectURL(data);
      setPreviewFile({ file, url });
    } catch (err: unknown) {
      console.error("Error previewing file:", err);
      showToast((err as Error).message || "Failed to preview file", 'error');
    }
  };

  const toggleFolder = (nodeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedFolders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  const selectFolder = (node: DirectoryNode) => {
    setActivePath(node.path);
    if (!expandedFolders.has(node.id)) {
      setExpandedFolders(prev => new Set(prev).add(node.id));
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (mimetype: string) => {
    if (mimetype?.startsWith("image/")) return <ImageIcon className="h-8 w-8 text-blue-500" />;
    if (mimetype === "application/pdf") return <FileText className="h-8 w-8 text-red-500" />;
    return <File className="h-8 w-8 text-gray-500" />;
  };

  const renderSidebarTree = (nodes: DirectoryNode[], depth = 0) => {
    return (
      <ul className="space-y-0.5">
        {nodes.map(node => {
          const isExpanded = expandedFolders.has(node.id);
          const isActive = activePath === node.path || activePath.startsWith(node.path + "/");
          
          return (
            <li key={node.id}>
              <div 
                className={`group flex items-center px-2 py-1.5 rounded-md cursor-pointer transition-colors ${
                  activePath === node.path 
                    ? "bg-teal-50 text-teal-700 font-medium" 
                    : isActive 
                      ? "text-teal-600 bg-white" 
                      : "text-gray-600 hover:bg-gray-100"
                }`}
                style={{ paddingLeft: `${depth * 12 + 8}px` }}
                onClick={() => selectFolder(node)}
              >
                {node.children && node.children.length > 0 ? (
                  <span onClick={(e) => toggleFolder(node.id, e)} className="mr-1 hover:text-gray-900">
                    {isExpanded ? <FolderOpen className="h-4 w-4 shrink-0" /> : <Folder className="h-4 w-4 shrink-0" />}
                  </span>
                ) : (
                  <Folder className="h-4 w-4 mr-1 shrink-0 text-gray-400" />
                )}
                <span className="flex-1 text-sm leading-tight break-words">{node.name.replace(/_/g, " ")}</span>
                
                {/* Folder Actions — visible on hover */}
                <div className="flex shrink-0 opacity-0 group-hover:opacity-100 items-center ml-1 transition-opacity">
                   <button onClick={(e) => { e.stopPropagation(); setIsFolderModalOpen({ isOpen: true, mode: 'create', targetPath: node.path }); setFolderNameInput(""); }} className="p-1 hover:text-teal-600 rounded" title="New Subfolder">
                     <Plus className="h-3 w-3" />
                   </button>
                   <button onClick={(e) => { e.stopPropagation(); setIsFolderModalOpen({ isOpen: true, mode: 'rename', targetPath: node.path }); setFolderNameInput(node.name); }} className="p-1 hover:text-blue-600 rounded" title="Rename">
                     <Edit2 className="h-3 w-3" />
                   </button>
                   <button onClick={(e) => { e.stopPropagation(); confirmDeleteFolder(node.path); }} className="p-1 hover:text-red-600 rounded" title="Delete">
                     <Trash2 className="h-3 w-3" />
                   </button>
                </div>
              </div>
              {node.children && isExpanded && (
                <div className="mt-0.5">
                  {renderSidebarTree(node.children, depth + 1)}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  const pathParts = activePath.split("/");

  return (
    <div className="max-w-7xl mx-auto flex flex-col h-[calc(100vh-6rem)] bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50 shrink-0">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Agency Directory</h1>
          <p className="text-sm text-gray-500">Manage all your internal and client documents</p>
        </div>
        <div className="flex items-center space-x-4">
           <button
              onClick={() => { setIsFolderModalOpen({ isOpen: true, mode: 'create', targetPath: activePath }); setFolderNameInput(""); }}
              className="flex items-center space-x-2 bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors shrink-0"
            >
              <Plus className="h-4 w-4" />
              <span>New Folder</span>
            </button>
           <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading || isLoading}
              className="flex items-center space-x-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 shrink-0"
            >
              {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
              <span>Upload File</span>
            </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-72 border-r border-gray-200 bg-gray-50 p-4 overflow-y-auto shrink-0 hidden md:block">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Folders</h2>
            <button
              onClick={() => { setIsFolderModalOpen({ isOpen: true, mode: 'create', targetPath: activePath }); setFolderNameInput(""); }}
              className="flex items-center space-x-1 text-xs text-teal-600 hover:text-teal-700 hover:bg-teal-50 px-2 py-1 rounded-md transition-colors"
              title="Create New Folder"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>New Folder</span>
            </button>
          </div>
          {renderSidebarTree(directoryStructure)}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 bg-white">
          {/* Breadcrumb */}
          <div className="flex items-center px-6 py-3 border-b border-gray-100 bg-white">
            <button 
              onClick={() => navigate('/admin/dashboard')}
              className="mr-3 p-1.5 text-gray-400 hover:text-teal-600 rounded-md hover:bg-teal-50 flex items-center justify-center transition-colors"
              title="Back to Dashboard"
            >
              <Home className="h-4 w-4" />
            </button>
            {pathParts.length > 1 && (
              <button 
                onClick={() => {
                  const newParts = [...pathParts];
                  newParts.pop();
                  setActivePath(newParts.join('/'));
                }}
                className="mr-3 p-1.5 text-gray-500 hover:text-gray-900 rounded-md hover:bg-gray-100 flex items-center justify-center transition-colors"
                title="Go Back"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
            )}
            <div className="flex items-center text-sm text-gray-500 overflow-x-auto whitespace-nowrap hide-scrollbar">
              {pathParts.map((part, index) => {
                const currentPath = pathParts.slice(0, index + 1).join("/");
                const isLast = index === pathParts.length - 1;
                return (
                  <React.Fragment key={index}>
                    <span 
                      className={`${isLast ? "text-gray-900 font-medium" : "cursor-pointer hover:text-teal-600 transition-colors"}`}
                      onClick={() => { if (!isLast) setActivePath(currentPath); }}
                    >
                      {part.replace(/_/g, " ")}
                    </span>
                    {!isLast && <ChevronRight className="h-4 w-4 mx-2 shrink-0" />}
                  </React.Fragment>
                );
              })}
            </div>
            <div className="ml-auto flex items-center space-x-2">
              {pathParts.length > 1 && (
                <button 
                  onClick={() => { 
                    setIsFolderModalOpen({ isOpen: true, mode: 'rename', targetPath: activePath }); 
                    setFolderNameInput(pathParts[pathParts.length - 1]); 
                  }} 
                  className="flex items-center space-x-1 px-2 py-1.5 text-xs text-gray-500 hover:text-blue-600 rounded-md hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-200"
                  title="Rename Current Folder"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Rename</span>
                </button>
              )}
              <button onClick={() => fetchFiles(activePath)} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100" title="Refresh">
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Sort Bar */}
          <div className="flex items-center justify-between px-6 py-2 border-b border-gray-100 bg-gray-50/50">
            <div className="text-xs text-gray-400">
              {files.length} item{files.length !== 1 ? 's' : ''}
            </div>
            <div className="flex items-center space-x-2">
              <ArrowUpDown className="h-3.5 w-3.5 text-gray-400" />
              <select 
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-') as ['name' | 'date' | 'size', 'asc' | 'desc'];
                  setSortBy(field);
                  setSortOrder(order);
                }}
                className="text-xs text-gray-600 bg-transparent border border-gray-200 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-teal-500 cursor-pointer"
              >
                <option value="name-asc">Name (A → Z)</option>
                <option value="name-desc">Name (Z → A)</option>
                <option value="date-desc">Date (Newest)</option>
                <option value="date-asc">Date (Oldest)</option>
                <option value="size-desc">Size (Largest)</option>
                <option value="size-asc">Size (Smallest)</option>
              </select>
            </div>
          </div>

          {/* File Grid */}
          <div className="flex-1 p-6 overflow-y-auto">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <Loader2 className="h-8 w-8 animate-spin mb-4 text-teal-500" />
                <p>Loading files...</p>
              </div>
            ) : files.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center max-w-sm mx-auto">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <FolderOpen className="h-8 w-8 text-gray-300" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">Folder is empty</h3>
                <p className="text-sm text-gray-500 mb-6">There are no files uploaded in '{pathParts[pathParts.length - 1].replace(/_/g, " ")}' yet.</p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-teal-600 font-medium hover:text-teal-700 text-sm"
                >
                  Upload your first file
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {[...files].sort((a, b) => {
                  const aIsFolder = !a.id && !a.metadata;
                  const bIsFolder = !b.id && !b.metadata;
                  // Folders always come first
                  if (aIsFolder && !bIsFolder) return -1;
                  if (!aIsFolder && bIsFolder) return 1;

                  let cmp = 0;
                  if (sortBy === 'name') {
                    cmp = a.name.localeCompare(b.name);
                  } else if (sortBy === 'date') {
                    const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
                    const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
                    cmp = dateA - dateB;
                  } else if (sortBy === 'size') {
                    const sizeA = a.metadata?.size || 0;
                    const sizeB = b.metadata?.size || 0;
                    cmp = sizeA - sizeB;
                  }
                  return sortOrder === 'asc' ? cmp : -cmp;
                }).map(file => {
                  const isFolderItem = !file.id && !file.metadata;
                  const itemPath = `${activePath}/${file.name}`;
                  
                  return (
                    <div 
                      key={file.id || file.name} 
                      className={`group flex flex-col p-4 bg-white border border-gray-200 rounded-xl hover:border-teal-300 hover:shadow-md transition-all duration-200 ${isFolderItem ? 'cursor-pointer' : ''}`}
                      onClick={isFolderItem ? () => {
                        setActivePath(itemPath);
                      } : undefined}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-teal-50 transition-colors">
                          {isFolderItem ? <Folder className="h-8 w-8 text-teal-500 fill-teal-100 opacity-80" /> : getFileIcon(file.metadata?.mimetype || "")}
                        </div>
                        <div className="flex opacity-0 group-hover:opacity-100 transition-opacity space-x-1" onClick={e => e.stopPropagation()}>
                          {!isFolderItem ? (
                            <>
                              <button onClick={() => handlePreviewFile(file)} className="p-1.5 text-gray-400 hover:text-blue-600 rounded-md hover:bg-blue-50" title="Preview">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button onClick={() => setMoveFile(file)} className="p-1.5 text-gray-400 hover:text-indigo-600 rounded-md hover:bg-indigo-50" title="Move">
                                <Move className="h-4 w-4" />
                              </button>
                              <button onClick={() => handleFileDownload(file)} className="p-1.5 text-gray-400 hover:text-teal-600 rounded-md hover:bg-teal-50" title="Download">
                                <Download className="h-4 w-4" />
                              </button>
                              <button onClick={() => confirmDeleteFile(file)} className="p-1.5 text-gray-400 hover:text-red-600 rounded-md hover:bg-red-50" title="Delete">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </>
                          ) : (
                            <>
                              <button onClick={(e) => { e.stopPropagation(); setIsFolderModalOpen({ isOpen: true, mode: 'rename', targetPath: itemPath }); setFolderNameInput(file.name); }} className="p-1.5 text-gray-400 hover:text-blue-600 rounded-md hover:bg-blue-50" title="Rename Folder">
                                <Edit2 className="h-4 w-4" />
                              </button>
                              <button onClick={(e) => { e.stopPropagation(); confirmDeleteFolder(itemPath); }} className="p-1.5 text-gray-400 hover:text-red-600 rounded-md hover:bg-red-50" title="Delete Folder">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="mt-auto">
                        <h4 className="text-sm font-medium text-gray-900 truncate mb-1" title={file.name}>{file.name}</h4>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{isFolderItem ? "Folder" : formatFileSize(file.metadata?.size || 0)}</span>
                          <span>{file.created_at ? new Date(file.created_at).toLocaleDateString() : ""}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}

      {/* Preview Modal */}
      {previewFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4 sm:p-6" onClick={() => setPreviewFile(null)}>
          <div className="bg-white rounded-xl shadow-2xl flex flex-col w-full max-w-5xl h-[90vh] overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
              <h3 className="font-medium text-gray-900 truncate pr-4">{previewFile.file.name}</h3>
              <div className="flex items-center space-x-2 shrink-0">
                <a href={previewFile.url} download={previewFile.file.name} className="p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900 rounded-lg">
                  <Download className="h-5 w-5" />
                </a>
                <button onClick={() => setPreviewFile(null)} className="p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900 rounded-lg">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 bg-gray-100 flex items-center justify-center overflow-auto p-4">
              {previewFile.file.metadata?.mimetype?.startsWith('image/') ? (
                <img src={previewFile.url} alt={previewFile.file.name} className="max-w-full max-h-full object-contain shadow-sm" />
              ) : previewFile.file.metadata?.mimetype === 'application/pdf' ? (
                <iframe src={previewFile.url} className="w-full h-full rounded shadow-sm bg-white" title={previewFile.file.name} />
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-500">
                  <FileText className="h-16 w-16 mb-4 text-gray-400" />
                  <p>Preview not available for this file type.</p>
                  <a href={previewFile.url} download={previewFile.file.name} className="mt-4 text-teal-600 hover:underline">Download instead</a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Folder Create/Rename Modal */}
      {isFolderModalOpen.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {isFolderModalOpen.mode === 'create' ? 'Create New Folder' : 'Rename Folder'}
            </h3>
            <p className="text-sm text-gray-500 mb-4 w-full break-all">
              Path: {isFolderModalOpen.targetPath || activePath}
            </p>
            <input 
              type="text" 
              value={folderNameInput}
              onChange={(e) => setFolderNameInput(e.target.value)}
              placeholder="Folder Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 mb-6"
              autoFocus
              onKeyDown={(e) => {
                if(e.key === 'Enter') {
                  if (isFolderModalOpen.mode === 'create') {
                    handleCreateFolder();
                  } else {
                    handleRenameFolder();
                  }
                }
              }}
            />
            <div className="flex justify-end space-x-3">
              <button onClick={() => setIsFolderModalOpen({ isOpen: false, mode: 'create' })} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
              <button 
                onClick={isFolderModalOpen.mode === 'create' ? handleCreateFolder : handleRenameFolder}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg"
              >
                {isFolderModalOpen.mode === 'create' ? 'Create' : 'Rename'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Move File Modal */}
      {moveFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 h-[80vh] flex flex-col">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Move File</h3>
            <p className="text-sm text-gray-500 mb-4 truncate text-ellipsis">Moving: <span className="font-semibold text-gray-700">{moveFile.name}</span></p>
            
            <div className="flex-1 overflow-y-auto border border-gray-200 rounded-lg p-2 mb-4 bg-gray-50">
               {renderSidebarTree(directoryStructure)}
            </div>

            <div className="flex justify-between items-center shrink-0">
               <div className="text-xs text-gray-500 truncate mr-4">
                  Dest: <span className="font-semibold text-gray-800">{activePath}</span>
               </div>
               <div className="flex justify-end space-x-3 shrink-0">
                 <button onClick={() => setMoveFile(null)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg shrink-0">Cancel</button>
                 <button 
                   onClick={() => executeMoveFile(activePath)}
                   className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shrink-0"
                 >
                   Move Here
                 </button>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4 mx-auto">
              <Trash2 className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
              Delete {deleteConfirm.isFolder ? 'Folder' : 'File'}?
            </h3>
            <p className="text-sm text-gray-500 text-center mb-6 break-all">
              Are you sure you want to permanently delete <strong>{deleteConfirm.targetUrl}</strong>? 
              {deleteConfirm.isFolder && <span className="block mt-1 text-red-500">Warning: This will recursively delete all files inside the folder!</span>}
            </p>
            
            <div className="flex justify-center space-x-4">
               <button 
                onClick={() => setDeleteConfirm(null)} 
                className="px-6 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 font-medium rounded-lg transition-colors w-full"
               >
                 Cancel
               </button>
               <button 
                 onClick={() => deleteConfirm.isFolder ? handleDeleteFolder(deleteConfirm.targetUrl) : handleDeleteFile(deleteConfirm.targetUrl)}
                 className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors w-full"
               >
                 Delete Permanently
               </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Toast Notification */}
      {toast && (
        <div className={`fixed bottom-6 right-6 flex items-center px-4 py-3 rounded-xl shadow-lg transform transition-all duration-300 z-50 ${
          toast.type === 'error' ? 'bg-red-50 text-red-800 border-l-4 border-red-500' : 'bg-teal-50 text-teal-800 border-l-4 border-teal-500'
        }`}>
          {toast.type === 'error' ? <X className="h-5 w-5 mr-3 shrink-0 text-red-500" /> : <CheckCircle className="h-5 w-5 mr-3 shrink-0 text-teal-500" />}
          <div className="text-sm font-medium mr-4">{toast.message}</div>
          <button onClick={() => setToast(null)} className="ml-auto p-1 rounded-md opacity-60 hover:opacity-100 focus:outline-none">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

    </div>
  );
}
