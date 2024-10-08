'use client';

import { useParams } from 'next/navigation';
import { Tutor } from '@/components/mainFeatures/tutor';
import { useEffect } from 'react';

export default function ChatPage(){
  const params = useParams();
  
  useEffect(() => {
    console.log('ChatPage params:', params);
  }, [params]);

  if (!params || !params.workspaceTitle) {
    console.error('No workspaceTitle found in params');
    return <div>Error: No workspace title provided</div>;
  }

  const workspaceTitle = decodeURIComponent(params.workspaceTitle);
  console.log('Decoded workspaceTitle:', workspaceTitle);

  return <Tutor workspaceTitle={workspaceTitle} />;
}