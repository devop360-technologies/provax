"use client";

import { APIKeyCard } from "./api-key-card";

interface APIKeysManagementProps {
  onGenerateKey?: (service: string) => void;
  onDeactivateKey?: (service: string) => void;
}

export function APIKeysManagement({
  onGenerateKey,
  onDeactivateKey,
}: APIKeysManagementProps) {
  return (
    <div className="space-y-6">
      <APIKeyCard
        serviceName="Stripe"
        icon="🔐"
        status="live"
        publicKey="pk_live_••••••••••••••••••••"
        secretKey="sk_live_••••••••••••••••••••"
        iconBgColor="#635BFF"
        onGenerateNewKey={() => onGenerateKey?.("stripe")}
        onDeactivate={() => onDeactivateKey?.("stripe")}
      />

      <APIKeyCard
        serviceName="Mercado Pago"
        icon="💳"
        status="live"
        publicKey="APP_USR_••••••••••••••••••••"
        accessToken="APP_USR_••••••••••••••••••••"
        iconBgColor="#0066CC"
        onGenerateNewKey={() => onGenerateKey?.("mercado-pago")}
        onDeactivate={() => onDeactivateKey?.("mercado-pago")}
      />

      <APIKeyCard
        serviceName="Vision AI"
        icon="👁️"
        status="live"
        publicKey="vai_••••••••••••••••••••"
        iconBgColor="#00D9FF"
        onGenerateNewKey={() => onGenerateKey?.("vision-ai")}
        onDeactivate={() => onDeactivateKey?.("vision-ai")}
      />

      <APIKeyCard
        serviceName="Decision Engine"
        icon="⚙️"
        status="live"
        publicKey="pk_live_••••••••••••••••••••"
        iconBgColor="#FF6B6B"
        onGenerateNewKey={() => onGenerateKey?.("decision-engine")}
        onDeactivate={() => onDeactivateKey?.("decision-engine")}
      />

      <APIKeyCard
        serviceName="AWS S3 Storage"
        icon="☁️"
        status="live"
        publicKey="pk_live_••••••••••••••••••••"
        secretKey="••••••••••••••••••••••••••••"
        iconBgColor="#FF9900"
        onGenerateNewKey={() => onGenerateKey?.("aws-s3")}
        onDeactivate={() => onDeactivateKey?.("aws-s3")}
      />
    </div>
  );
}
