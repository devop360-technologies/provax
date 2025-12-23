import React from 'react'
import Image from 'next/image'

export const Dashboard = () => {
  const recentActivities = [
    {
      icon: '/provider/payment.png',
      title: 'Payment Approved',
      description: 'Invoice #102 - $650.00 for brake replacement service',
      time: 'Today, 10:45 AM',
      iconBg: 'bg-blue-500/20'
    },
    {
      icon: '/provider/job.png',
      title: 'Job Status Updated',
      description: 'Brake Replacement is now In Progress',
      time: 'Today, 09:15 AM',
      iconBg: 'bg-red-500/20'
    },
    {
      icon: '/provider/proposal.png',
      title: 'New Proposal Received',
      description: 'From AutoCare Pros for windshield replacement',
      time: 'Yesterday, 03:30 PM',
      iconBg: 'bg-blue-500/20'
    },
    {
      icon: '/provider/ai.png',
      title: 'AI Analysis Complete',
      description: 'Vehicle: 2020 Toyota Camry - Certification ready for review',
      time: 'Yesterday, 01:10 PM',
      iconBg: 'bg-cyan-500/20'
    },
    {
      icon: '/provider/issue.png',
      title: 'Upload Issue',
      description: 'Failed to process image_023.jpg. Please check format and try again.',
      time: 'Yesterday, 11:45 AM',
      iconBg: 'bg-red-500/20'
    }
  ]

  const notifications = [
    {
      title: 'New certification assigned',
      description: 'Your AI certification report for Vehicle VIN 1HGCM82633A123456 is ready for review.',
      time: '2 min ago',
      badge: 'Certification',
      badgeColor: 'bg-purple-600'
    },
    {
      title: 'Proposal accepted',
      description: 'You have a new proposal from AutoFix Inc. for Windshield Replacement job.',
      time: '10 min ago',
      badge: 'Proposal',
      badgeColor: 'bg-purple-600'
    },
    {
      title: 'Payment released',
      description: "Your job 'Brake Pad Replacement' is now In Progress.",
      time: '1 hour ago',
      badge: 'Job',
      badgeColor: 'bg-blue-600'
    },
    {
      title: 'Disputes opened',
      description: 'Payment for Invoice #102 has been approved and processed.',
      time: '1 hour ago',
      badge: 'Payment',
      badgeColor: 'bg-blue-600'
    },
    {
      title: 'Media reupload requested',
      description: 'Failed to process image_023.jpg. Please check the format and try again.',
      time: '3 hours ago',
      badge: 'Upload',
      badgeColor: 'bg-blue-600'
    }
  ]

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
      {/* Recent Activity */}
      <div className='bg-[#1D1D41] rounded-xl p-6 '>
        <h2 className='text-white text-xl font-semibold mb-6'>Recent Activity</h2>
        <div className='space-y-4'>
          {recentActivities.map((activity, index) => (
            <div key={index} className='flex items-start gap-4 rounded-xl p-3 bg-[#23234B]'>
              <div className={`${activity.iconBg} rounded-full p-3 flex-shrink-0`}>
                <Image 
                  src={activity.icon} 
                  alt={activity.title} 
                  width={24} 
                  height={24}
                  className='w-6 h-6'
                />
              </div>
              <div className='flex-1 min-w-0'>
                <h3 className='text-blue-400 font-medium text-sm mb-1'>{activity.title}</h3>
                <p className='text-gray-300 text-sm mb-1'>{activity.description}</p>
                <p className='text-gray-500 text-xs'>{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className='bg-[#1D1D41] rounded-xl p-6'>
        <h2 className='text-white text-xl font-semibold mb-6'>Notifications</h2>
        <div className='space-y-4'>
          {notifications.map((notification, index) => (
            <div key={index} className='border-l-4 border-red-500 pl-4 py-2 rounded-xl p-1 bg-[#23234B]'>
              <div className='flex items-start justify-between mb-2'>
                <h3 className='text-blue-400 font-medium text-sm'>{notification.title}</h3>
                <span className='text-gray-500 text-xs whitespace-nowrap ml-2'>{notification.time}</span>
              </div>
              <p className='text-gray-300 text-sm mb-2'>{notification.description}</p>
              <span className={`${notification.badgeColor} text-white text-xs px-3 py-1 rounded inline-block`}>
                {notification.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
