"use client";

import { Pencil, CheckCircle } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface NotificationPreference {
  id: string;
  label: string;
  checked: boolean;
}

interface PersonalInfoData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  avatar: string;
  notifications: NotificationPreference[];
}

interface PersonalInfoProps {
  className?: string;
  data?: PersonalInfoData;
  onEditInfo?: () => void;
  onSaveChanges?: () => void;
  onAvatarChange?: () => void;
}

const defaultData: PersonalInfoData = {
  firstName: "John",
  lastName: "Anderson",
  email: "john@autoproservices.com",
  phoneNumber: "(555) 123-4567",
  streetAddress: "123 Auto Repair Lane",
  city: "San Francisco",
  state: "California",
  zipCode: "94107",
  avatar: "/avatars/avatar-1.jpg",
  notifications: [
    { id: "1", label: "Email notifications for new service requests", checked: true },
    { id: "2", label: "SMS notifications for urgent requests", checked: true },
    { id: "3", label: "Email when receiving new reviews", checked: true },
  ],
};

function FormField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="block text-sm text-gray-400 mb-2">{label}</label>
      <div className="rounded-lg bg-[#23234B] px-4 py-3 text-sm text-white">
        {value}
      </div>
    </div>
  );
}

export function PersonalInfo({
  className,
  data = defaultData,
  onEditInfo,
  onSaveChanges,
  onAvatarChange,
}: PersonalInfoProps) {
  return (
    <div className={cn("rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-lg font-semibold text-white">Personal Information</h2>
        <button
          onClick={onEditInfo}
          className="flex items-center gap-2 rounded-lg bg-[#3B82F6] px-4 py-2 text-sm font-medium text-white hover:bg-[#2563EB] transition-colors"
        >
          <Pencil size={16} />
          Edit Info
        </button>
      </div>

      {/* Content */}
      <div className="flex gap-8">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-[#64CFF6]">
              <Image
                src={data.avatar}
                alt="Profile"
                width={96}
                height={96}
                className="object-cover w-full h-full"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/avatars/default.png";
                }}
              />
            </div>
            <button
              onClick={onAvatarChange}
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#3B82F6] flex items-center justify-center text-white hover:bg-[#2563EB] transition-colors"
            >
              <Pencil size={14} />
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <div className="flex-1 space-y-6">
          {/* Row 1: First Name, Last Name */}
          <div className="grid grid-cols-2 gap-6">
            <FormField label="First Name" value={data.firstName} />
            <FormField label="Last Name" value={data.lastName} />
          </div>

          {/* Row 2: Email, Phone */}
          <div className="grid grid-cols-2 gap-6">
            <FormField label="Email" value={data.email} />
            <FormField label="Phone Number" value={data.phoneNumber} />
          </div>

          {/* Row 3: Street Address, City */}
          <div className="grid grid-cols-2 gap-6">
            <FormField label="Street Address" value={data.streetAddress} />
            <FormField label="City" value={data.city} />
          </div>

          {/* Row 4: State, ZIP Code */}
          <div className="grid grid-cols-2 gap-6">
            <FormField label="State" value={data.state} />
            <FormField label="ZIP Code" value={data.zipCode} />
          </div>

          {/* Notification Preferences */}
          <div className="pt-2">
            <h3 className="text-base font-semibold text-white mb-4">Notification Preferences</h3>
            <div className="space-y-3">
              {data.notifications.map((notification) => (
                <div key={notification.id} className="flex items-center gap-3">
                  <div className={cn(
                    "w-5 h-5 rounded-full flex items-center justify-center",
                    notification.checked ? "bg-[#3B82F6]" : "bg-[#2a2d4a]"
                  )}>
                    {notification.checked && <CheckCircle size={14} className="text-white" />}
                  </div>
                  <span className="text-sm text-gray-300">{notification.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={onSaveChanges}
          className="rounded-lg bg-[#3B82F6] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#2563EB] transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
