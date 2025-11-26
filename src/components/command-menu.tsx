"use client"

import React from 'react'

export function CommandMenu() {
  return (
    <div className="flex items-center space-x-2">
      <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </div>
  )
}