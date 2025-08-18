import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css'; // Syntax highlighting theme

const MarkdownRenderer = ({ documentationFile, className = '' }) => {
  const [markdownContent, setMarkdownContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMarkdownFile = async () => {
      if (!documentationFile) {
        setMarkdownContent('');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        // Fetch the markdown file from public folder
        const basePath = process.env.PUBLIC_URL || '';
        const response = await fetch(`${basePath}/docs/projects/${documentationFile}`);
        if (!response.ok) {
          throw new Error(`Failed to load documentation: ${response.status}`);
        }
        const content = await response.text();
        setMarkdownContent(content);
      } catch (err) {
        console.error('Error loading markdown:', err);
        setError('Failed to load technical documentation');
        setMarkdownContent('');
      } finally {
        setLoading(false);
      }
    };

    loadMarkdownFile();
  }, [documentationFile]);

  if (loading) {
    return (
      <div className={`${className} animate-pulse`}>
        <div className="space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${className} text-center py-8`}>
        <div className="text-red-500 mb-4">⚠️ {error}</div>
        <p className="text-gray-600">
          Technical documentation will be available soon. Check back later for detailed 
          architecture diagrams, code samples, and implementation details.
        </p>
      </div>
    );
  }

  if (!markdownContent) {
    return (
      <div className={`${className} text-center py-8`}>
        <div className="text-gray-500 mb-4">📄 No documentation file specified</div>
        <p className="text-gray-600">
          Technical documentation will be added here soon.
        </p>
      </div>
    );
  }

  return (
    <div className={`${className} prose prose-gray max-w-none`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          // Customize markdown rendering
          h1: ({ children }) => (
            <h1 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-bold text-gray-900 mb-3 mt-6">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-bold text-gray-900 mb-2 mt-4">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-gray-700 mb-4 leading-relaxed">
              {children}
            </p>
          ),
          code: ({ inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <div className="relative">
                <pre className="bg-gray-50 rounded-lg p-4 overflow-x-auto border">
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
                <div className="absolute top-2 right-2 text-xs text-gray-500 bg-white px-2 py-1 rounded border">
                  {match[1]}
                </div>
              </div>
            ) : (
              <code className="bg-gray-100 text-red-600 px-1 py-0.5 rounded text-sm" {...props}>
                {children}
              </code>
            );
          },
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded-r">
              {children}
            </blockquote>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-4 space-y-1 text-gray-700">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-4 space-y-1 text-gray-700">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-gray-700">
              {children}
            </li>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full border border-gray-200 rounded-lg">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="px-4 py-2 bg-gray-100 border-b border-gray-200 text-left font-semibold text-gray-900">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-2 border-b border-gray-200 text-gray-700">
              {children}
            </td>
          ),
          a: ({ href, children }) => (
            <a 
              href={href} 
              className="text-blue-600 hover:text-blue-800 underline" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
        }}
      >
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;