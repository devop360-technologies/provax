import React from "react";

export default function SupportFilters() {
  return (
    <div className="bg-[#1D1D41] rounded-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        {/* Status Filter */}
        <div>
          <label htmlFor="supportStatusFilter" className="block text-sm font-medium text-gray-300 mb-2">Status</label>
          <select id="supportStatusFilter" className="w-full bg-[#252850] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400">
            <option>All Status</option>
            <option>Open</option>
            <option>Pending</option>
            <option>Resolved</option>
          </select>
        </div>

        {/* Priority Filter */}
        <div>
          <label htmlFor="supportPriorityFilter" className="block text-sm font-medium text-gray-300 mb-2">Priority</label>
          <select id="supportPriorityFilter" className="w-full bg-[#252850] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400">
            <option>All Priorities</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>

        {/* Topic Filter */}
        <div>
          <label htmlFor="supportTopicFilter" className="block text-sm font-medium text-gray-300 mb-2">Topic</label>
          <select id="supportTopicFilter" className="w-full bg-[#252850] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400">
            <option>All Topic</option>
            <option>Billing</option>
            <option>Technical Issue</option>
            <option>Account Problem</option>
            <option>Feature Request</option>
          </select>
        </div>

        {/* Assigned Agent Filter */}
        <div>
          <label htmlFor="supportAgentFilter" className="block text-sm font-medium text-gray-300 mb-2">Assigned Agent</label>
          <select id="supportAgentFilter" className="w-full bg-[#252850] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400">
            <option>All Agents</option>
            <option>Sarah Johnson</option>
            <option>Michael Brown</option>
            <option>John Smith</option>
          </select>
        </div>

          {/* Apply Filters Button */}
      <div className="text-right">
        <button className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors text-sm font-medium">
          Apply Filters
        </button>
      </div>
      </div>

    
    </div>
  );
}