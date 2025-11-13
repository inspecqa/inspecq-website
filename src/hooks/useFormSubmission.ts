import { useState } from 'react';

interface FormSubmission {
  id: string;
  type: string;
  name: string;
  email: string;
  company?: string;
  message?: string;
  service?: string;
  demoType?: string;
  preferredTime?: string;
  teamSize?: string;
  useCase?: string;
  position?: string;
  experience?: string;
  resume?: string;
  submitted: string;
  status: string;
  source: string;
}

interface EmailNotification {
  to: string;
  subject: string;
  body: string;
  type: string;
}

export const useFormSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async (formData: Partial<FormSubmission>, formType: string, sourcePage: string) => {
    setIsSubmitting(true);
    
    try {
      // Create submission object
      const submission: FormSubmission = {
        id: Date.now().toString(),
        type: formType,
        name: formData.name || '',
        email: formData.email || '',
        company: formData.company,
        message: formData.message,
        service: formData.service,
        demoType: formData.demoType,
        preferredTime: formData.preferredTime,
        teamSize: formData.teamSize,
        useCase: formData.useCase,
        position: formData.position,
        experience: formData.experience,
        resume: formData.resume,
        submitted: new Date().toLocaleString(),
        status: 'New',
        source: sourcePage
      };

      // Store in localStorage (in production, this would be sent to a backend)
      const existingSubmissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
      existingSubmissions.unshift(submission);
      localStorage.setItem('formSubmissions', JSON.stringify(existingSubmissions));

      // Send email notification
      await sendEmailNotification(submission);

      // Show browser notification if permission granted
      if (Notification.permission === 'granted') {
        new Notification('New Form Submission', {
          body: `${formType} from ${submission.name}`,
          icon: '/favicon.ico'
        });
      }

      return { success: true, submission };
    } catch (error) {
      console.error('Form submission error:', error);
      if(error instanceof Error){
        return { success: false, error: error.message };
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const sendEmailNotification = async (submission: FormSubmission) => {
    // In a real application, this would call your backend API
    // For demo purposes, we'll simulate the email sending
    
    const emailData: EmailNotification = {
      to: 'helloinspecq@gmail.com',
      subject: `New ${submission.type} - ${submission.name}`,
      body: generateEmailBody(submission),
      type: submission.type
    };

    // Simulate API call
    console.log('Email notification sent:', emailData);
    
    // In production, you would use a service like:
    // - EmailJS for client-side email sending
    // - SendGrid, Mailgun, or similar for server-side
    // - Your own backend API endpoint
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(emailData);
      }, 1000);
    });
  };

  const generateEmailBody = (submission: FormSubmission): string => {
    let body = `
New ${submission.type} Received

Contact Information:
- Name: ${submission.name}
- Email: ${submission.email}
- Company: ${submission.company || 'Not provided'}
- Submitted: ${submission.submitted}
- Source: ${submission.source}

`;

    if (submission.message) {
      body += `Message:\n${submission.message}\n\n`;
    }

    if (submission.service) {
      body += `Service Interest: ${submission.service}\n`;
    }

    if (submission.demoType) {
      body += `Demo Type: ${submission.demoType}\n`;
    }

    if (submission.preferredTime) {
      body += `Preferred Time: ${submission.preferredTime}\n`;
    }

    if (submission.teamSize) {
      body += `Team Size: ${submission.teamSize}\n`;
    }

    if (submission.useCase) {
      body += `Use Case: ${submission.useCase}\n`;
    }

    if (submission.position) {
      body += `Position: ${submission.position}\n`;
    }

    if (submission.experience) {
      body += `Experience: ${submission.experience}\n`;
    }

    body += `\n---\nThis email was automatically generated from the InspecQ website.`;

    return body;
  };

  const requestNotificationPermission = () => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  };

  return {
    submitForm,
    isSubmitting,
    requestNotificationPermission
  };
};