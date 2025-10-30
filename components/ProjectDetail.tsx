'use client';

import { useState } from 'react';
import { ArrowLeft, Paperclip, Link as LinkIcon, Copy, Check, MoreHorizontal, ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Comment = {
  id: string;
  author: string;
  authorAvatar: string;
  content: string;
  timestamp: string;
};

type Attachment = {
  id: string;
  name: string;
  size: string;
  uploadedAt: string;
  thumbnail?: string;
};

export default function ProjectDetail({ projectId }: { projectId: string }) {
  const router = useRouter();
  const [status] = useState('In progress');
  const [showDetails, setShowDetails] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      author: 'John Doe',
      authorAvatar: 'JD',
      content: 'Started working on this project. Will update the progress by end of week.',
      timestamp: '2 hours ago',
    },
    {
      id: '2',
      author: 'Sarah Smith',
      authorAvatar: 'SS',
      content: 'Added the initial design mockups. Please review and provide feedback.',
      timestamp: '1 day ago',
    },
  ]);

  const [attachments] = useState<Attachment[]>([
    {
      id: '1',
      name: 'design-mockup.jpg',
      size: '2.4 MB',
      uploadedAt: '10 Apr 2022 10:01 am',
    },
    {
      id: '2',
      name: 'requirements.pdf',
      size: '1.8 MB',
      uploadedAt: '17 Apr 2022 9:51 am',
    },
  ]);

  const handleAddComment = () => {
    if (commentText.trim()) {
      const newComment: Comment = {
        id: Date.now().toString(),
        author: 'You',
        authorAvatar: 'YO',
        content: commentText,
        timestamp: 'Just now',
      };
      setComments([newComment, ...comments]);
      setCommentText('');
    }
  };

  const getInitialsColor = (initials: string) => {
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
    const index = initials.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className="flex gap-6">
      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to projects</span>
          </button>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-600">PROJ-{projectId}</span>
              <h1 className="text-2xl font-bold text-gray-900">Website Redesign Project</h1>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-white rounded-lg transition-colors">
                <Copy className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-white rounded-lg transition-colors">
                <LinkIcon className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-white rounded-lg transition-colors">
                <MoreHorizontal className="w-4 h-4 text-gray-600" />
              </button>
              <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium">
                Issue action
              </button>
            </div>
          </div>
        </div>

        {/* Status Dropdown */}
        <div className="mb-6">
          <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium flex items-center gap-2">
            {status}
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Content Card */}
        <div className="rounded-2xl p-6 shadow-lg mb-6" style={{ backgroundColor: 'rgba(255, 255, 255, 0.32)' }}>
          {/* Issue Content Header */}
          <div className="flex items-center gap-3 mb-6 pb-4">
            <button className="px-3 py-1.5 bg-orange-500 text-white rounded text-xs font-medium hover:bg-orange-600 transition-colors">
              Issue content
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
              <Paperclip className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
              <Copy className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
              <LinkIcon className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
              <Check className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
              <MoreHorizontal className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Description</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              We need to redesign the company website to improve user experience and modernize the visual design. 
              The project includes updating the homepage, product pages, and contact forms. We should focus on 
              mobile responsiveness and accessibility standards.
            </p>
          </div>

          {/* Attachments */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-900">Attachments ({attachments.length})</h3>
              <div className="flex items-center gap-2">
                <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                  <MoreHorizontal className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                  <Plus className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="rounded-lg p-3 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                      <Paperclip className="w-5 h-5 text-gray-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{attachment.name}</p>
                      <p className="text-xs text-gray-500">{attachment.uploadedAt}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Child Issues */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-gray-900">Child issues</h3>
                <span className="text-xs text-gray-500">0% Done</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-xs text-gray-600 hover:text-gray-900">Order by</button>
                <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                  <MoreHorizontal className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                  <Plus className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
            <div className="h-1 bg-gray-200 rounded-full mb-4">
              <div className="h-1 bg-orange-500 rounded-full" style={{ width: '0%' }}></div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-orange-600">PROJ-101</span>
                  <span className="text-sm text-gray-900">Design homepage mockup</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                    style={{ backgroundColor: getInitialsColor('JD') }}
                  >
                    JD
                  </div>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">TO DO</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-orange-600">PROJ-102</span>
                  <span className="text-sm text-gray-900">Update navigation structure</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                    style={{ backgroundColor: getInitialsColor('SS') }}
                  >
                    SS
                  </div>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">TO DO</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity / Comments Section */}
        <div className="rounded-2xl p-6 shadow-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.32)' }}>
          <div className="flex items-center gap-4 mb-6 pb-4">
            <button className="px-3 py-1.5 bg-orange-500 text-white rounded text-xs font-medium hover:bg-orange-600 transition-colors">
              Issue activity
            </button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Show:</span>
              <button className="px-3 py-1.5 rounded text-xs font-medium text-gray-700 hover:bg-gray-50" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                Comments
                <ChevronDown className="w-3 h-3 inline ml-1" />
              </button>
            </div>
            <div className="ml-auto">
              <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
                Newest first
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Add Comment */}
          <div className="flex gap-3 mb-6">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white flex-shrink-0"
              style={{ backgroundColor: getInitialsColor('YO') }}
            >
              YO
            </div>
            <div className="flex-1">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
                className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm text-gray-900 resize-none" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
                rows={3}
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={handleAddComment}
                  disabled={!commentText.trim()}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Comment
                </button>
              </div>
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white flex-shrink-0"
                  style={{ backgroundColor: getInitialsColor(comment.authorAvatar) }}
                >
                  {comment.authorAvatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-gray-900">{comment.author}</span>
                    <span className="text-xs text-gray-500">{comment.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Details Sidebar */}
      <div className="w-80 flex-shrink-0">
        <div className="rounded-2xl p-6 shadow-lg sticky top-8" style={{ backgroundColor: 'rgba(255, 255, 255, 0.32)' }}>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center justify-between w-full mb-4"
          >
            <h3 className="text-base font-semibold text-gray-900">Details</h3>
            {showDetails ? (
              <ChevronUp className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-600" />
            )}
          </button>

          {showDetails && (
            <div className="space-y-4">
              {/* Assignee */}
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-2 block">Assignee</label>
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                    style={{ backgroundColor: getInitialsColor('EH') }}
                  >
                    EH
                  </div>
                  <span className="text-sm text-gray-900">Elsa Hugo</span>
                </div>
              </div>

              {/* Reporter */}
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-2 block">Reporter</label>
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                    style={{ backgroundColor: getInitialsColor('BM') }}
                  >
                    BM
                  </div>
                  <span className="text-sm text-gray-900">Bob Morane</span>
                </div>
              </div>

              {/* Priority */}
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-2 block">Priority</label>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-sm"></div>
                  </div>
                  <span className="text-sm text-gray-900">Medium</span>
                </div>
              </div>

              {/* Labels */}
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-2 block">Labels</label>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                    feature
                  </span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                    support
                  </span>
                </div>
              </div>

              {/* More Fields */}
              <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                <span>More fields</span>
                <span className="text-xs">Time tracking, automation, reminders, pr...</span>
                <ChevronDown className="w-4 h-4 ml-auto" />
              </button>

              {/* Support App */}
              <div className="pt-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">Support app</span>
                    <span className="text-xs text-gray-500">🎯 Support tickets</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-semibold text-gray-700">12</span>
                    <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                      <ChevronDown className="w-3 h-3 text-gray-600" />
                    </button>
                    <button className="px-2 py-1 bg-orange-500 text-white rounded text-xs font-medium hover:bg-orange-600 transition-colors">
                      Issue content
                    </button>
                  </div>
                </div>
              </div>

              {/* Timestamps */}
              <div className="pt-4 space-y-2">
                <div className="text-xs text-gray-600">
                  <span className="font-medium">Created</span> 8 May 2019 1:43 PM
                </div>
                <div className="text-xs text-gray-600">
                  <span className="font-medium">Updated</span> 2 hours ago
                </div>
              </div>

              {/* Configure Button */}
              <button className="w-full mt-4 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center justify-center gap-2" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                <span>⚙️</span>
                Configure
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
