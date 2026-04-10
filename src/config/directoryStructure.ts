export type DirectoryNode = {
  id: string;
  name: string;
  type: "folder" | "file";
  path: string;
  children?: DirectoryNode[];
};

export const INITIAL_DIRECTORY_STRUCTURE: DirectoryNode[] = [
  {
    id: "01_admin_legal_finance",
    name: "01_Admin_Legal_Finance",
    type: "folder",
    path: "01_Admin_Legal_Finance",
    children: [
      { id: "legal_documents", name: "Legal_Documents", type: "folder", path: "01_Admin_Legal_Finance/Legal_Documents" },
      { id: "finance_accounting", name: "Finance_Accounting", type: "folder", path: "01_Admin_Legal_Finance/Finance_Accounting" },
    ],
  },
  {
    id: "02_sales_marketing",
    name: "02_Sales_Marketing",
    type: "folder",
    path: "02_Sales_Marketing",
    children: [
      { id: "brand_assets", name: "Brand_Assets", type: "folder", path: "02_Sales_Marketing/Brand_Assets" },
      { id: "sales_collateral", name: "Sales_Collateral", type: "folder", path: "02_Sales_Marketing/Sales_Collateral" },
      { id: "marketing_content", name: "Marketing_Content", type: "folder", path: "02_Sales_Marketing/Marketing_Content" },
    ],
  },
  {
    id: "03_operations_hr",
    name: "03_Operations_HR",
    type: "folder",
    path: "03_Operations_HR",
    children: [
      { id: "sops", name: "SOPs", type: "folder", path: "03_Operations_HR/SOPs" },
      { id: "hr_team", name: "HR_Team", type: "folder", path: "03_Operations_HR/HR_Team" },
    ],
  },
  {
    id: "04_client_projects",
    name: "04_Client_Projects",
    type: "folder",
    path: "04_Client_Projects",
    children: [], // Initially empty, will populate with client folders
  },
  {
    id: "05_archived_projects",
    name: "05_Archived_Projects",
    type: "folder",
    path: "05_Archived_Projects",
    children: [],
  },
  {
    id: "06_templates_assets",
    name: "06_Templates_Assets",
    type: "folder",
    path: "06_Templates_Assets",
    children: [],
  },
];
