'use client';

import React from 'react';

export interface ModernIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
  strokeWidth?: number;
}

function createIcon(name: string, pathSvg: string) {
  const IconComponent = ({
    size = 18,
    className = '',
    strokeWidth = 2,
    ...props
  }: ModernIconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 inline-block align-middle select-none ${className}`}
      aria-hidden="true"
      {...props}
      dangerouslySetInnerHTML={{ __html: pathSvg }}
    />
  );
  IconComponent.displayName = `Icon${name}`;
  return IconComponent;
}

export const IconDashboard = createIcon('Dashboard', '<rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>');
export const IconBookOpen = createIcon('BookOpen', '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>');
export const IconGraduationCap = createIcon('GraduationCap', '<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>');
export const IconUsers = createIcon('Users', '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>');
export const IconUser = createIcon('User', '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>');
export const IconCalendar = createIcon('Calendar', '<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>');
export const IconClock = createIcon('Clock', '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>');
export const IconBell = createIcon('Bell', '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>');
export const IconSearch = createIcon('Search', '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>');
export const IconSettings = createIcon('Settings', '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>');
export const IconCheck = createIcon('Check', '<polyline points="20 6 9 17 4 12"/>');
export const IconCheckCircle = createIcon('CheckCircle', '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>');
export const IconX = createIcon('X', '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>');
export const IconAlertCircle = createIcon('AlertCircle', '<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>');
export const IconAlertTriangle = createIcon('AlertTriangle', '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/>');
export const IconInfo = createIcon('Info', '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>');
export const IconStar = createIcon('Star', '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>');
export const IconStarFilled = createIcon('StarFilled', '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="currentColor"/>');
export const IconChevronDown = createIcon('ChevronDown', '<path d="m6 9 6 6 6-6"/>');
export const IconChevronUp = createIcon('ChevronUp', '<path d="m18 15-6-6-6 6"/>');
export const IconChevronLeft = createIcon('ChevronLeft', '<path d="m15 18-6-6 6-6"/>');
export const IconChevronRight = createIcon('ChevronRight', '<path d="m9 18 6-6-6-6"/>');
export const IconArrowRight = createIcon('ArrowRight', '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>');
export const IconArrowLeft = createIcon('ArrowLeft', '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>');
export const IconArrowUp = createIcon('ArrowUp', '<path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>');
export const IconArrowDown = createIcon('ArrowDown', '<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>');
export const IconPlus = createIcon('Plus', '<path d="M5 12h14"/><path d="M12 5v14"/>');
export const IconMinus = createIcon('Minus', '<path d="M5 12h14"/>');
export const IconEdit = createIcon('Edit', '<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/>');
export const IconTrash = createIcon('Trash', '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>');
export const IconCopy = createIcon('Copy', '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>');
export const IconExternalLink = createIcon('ExternalLink', '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>');
export const IconRefreshCw = createIcon('RefreshCw', '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>');
export const IconDownload = createIcon('Download', '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>');
export const IconUpload = createIcon('Upload', '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>');
export const IconLock = createIcon('Lock', '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>');
export const IconUnlock = createIcon('Unlock', '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>');
export const IconKey = createIcon('Key', '<circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/>');
export const IconShield = createIcon('Shield', '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>');
export const IconCode = createIcon('Code', '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>');
export const IconTerminal = createIcon('Terminal', '<polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/>');
export const IconCpu = createIcon('Cpu', '<rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/>');
export const IconFileText = createIcon('FileText', '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>');
export const IconFolder = createIcon('Folder', '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>');
export const IconAward = createIcon('Award', '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>');
export const IconTrophy = createIcon('Trophy', '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>');
export const IconSparkles = createIcon('Sparkles', '<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>');
export const IconZap = createIcon('Zap', '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>');
export const IconActivity = createIcon('Activity', '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>');
export const IconEye = createIcon('Eye', '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>');
export const IconEyeOff = createIcon('EyeOff', '<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/>');
export const IconFilter = createIcon('Filter', '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>');
export const IconGrid = createIcon('Grid', '<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>');
export const IconList = createIcon('List', '<line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/>');
export const IconLogOut = createIcon('LogOut', '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>');
export const IconMoreHorizontal = createIcon('MoreHorizontal', '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>');
export const IconMoreVertical = createIcon('MoreVertical', '<circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>');
export const IconSun = createIcon('Sun', '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>');
export const IconMoon = createIcon('Moon', '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>');
export const IconMaximize = createIcon('Maximize', '<path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/>');
export const IconMinimize = createIcon('Minimize', '<path d="M4 14h6v6"/><path d="M20 10h-6V4"/><path d="M14 10l7-7"/><path d="M3 21l7-7"/>');
export const IconCheckSquare = createIcon('CheckSquare', '<polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>');
export const IconSquare = createIcon('Square', '<rect width="18" height="18" x="3" y="3" rx="2"/>');
export const IconBookmark = createIcon('Bookmark', '<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>');
export const IconPlay = createIcon('Play', '<polygon points="5 3 19 12 5 21 5 3"/>');
export const IconPause = createIcon('Pause', '<rect width="4" height="16" x="6" y="4"/><rect width="4" height="16" x="14" y="4"/>');
export const IconQrCode = createIcon('QrCode', '<rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/>');
export const IconHelpCircle = createIcon('HelpCircle', '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" x2="12.01" y1="17" y2="17"/>');
export const IconCompass = createIcon('Compass', '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>');
export const IconLayers = createIcon('Layers', '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>');
export const IconPieChart = createIcon('PieChart', '<path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>');
export const IconBarChart2 = createIcon('BarChart2', '<line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/>');
export const IconTrendingUp = createIcon('TrendingUp', '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>');
export const IconTrendingDown = createIcon('TrendingDown', '<polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/>');
export const IconMessageSquare = createIcon('MessageSquare', '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>');
export const IconSend = createIcon('Send', '<line x1="22" x2="11" y1="2" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>');
export const IconShare2 = createIcon('Share2', '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/>');
export const IconPrinter = createIcon('Printer', '<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/>');
export const IconMail = createIcon('Mail', '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>');
export const IconPhone = createIcon('Phone', '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>');
export const IconDatabase = createIcon('Database', '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>');
export const IconServer = createIcon('Server', '<rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/>');
export const IconWifi = createIcon('Wifi', '<path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" x2="12.01" y1="20" y2="20"/>');
export const IconWifiOff = createIcon('WifiOff', '<line x1="1" x2="23" y1="1" y2="23"/><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"/><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"/><path d="M10.71 5.05A16 16 0 0 1 22.58 9"/><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" x2="12.01" y1="20" y2="20"/>');

export type ModernIconName = 'Dashboard' | 'BookOpen' | 'GraduationCap' | 'Users' | 'User' | 'Calendar' | 'Clock' | 'Bell' | 'Search' | 'Settings' | 'Check' | 'CheckCircle' | 'X' | 'AlertCircle' | 'AlertTriangle' | 'Info' | 'Star' | 'StarFilled' | 'ChevronDown' | 'ChevronUp' | 'ChevronLeft' | 'ChevronRight' | 'ArrowRight' | 'ArrowLeft' | 'ArrowUp' | 'ArrowDown' | 'Plus' | 'Minus' | 'Edit' | 'Trash' | 'Copy' | 'ExternalLink' | 'RefreshCw' | 'Download' | 'Upload' | 'Lock' | 'Unlock' | 'Key' | 'Shield' | 'Code' | 'Terminal' | 'Cpu' | 'FileText' | 'Folder' | 'Award' | 'Trophy' | 'Sparkles' | 'Zap' | 'Activity' | 'Eye' | 'EyeOff' | 'Filter' | 'Grid' | 'List' | 'LogOut' | 'MoreHorizontal' | 'MoreVertical' | 'Sun' | 'Moon' | 'Maximize' | 'Minimize' | 'CheckSquare' | 'Square' | 'Bookmark' | 'Play' | 'Pause' | 'QrCode' | 'HelpCircle' | 'Compass' | 'Layers' | 'PieChart' | 'BarChart2' | 'TrendingUp' | 'TrendingDown' | 'MessageSquare' | 'Send' | 'Share2' | 'Printer' | 'Mail' | 'Phone' | 'Database' | 'Server' | 'Wifi' | 'WifiOff';

export const MODERN_ICONS: Record<ModernIconName, React.ComponentType<ModernIconProps>> = {
  Dashboard: IconDashboard,
  BookOpen: IconBookOpen,
  GraduationCap: IconGraduationCap,
  Users: IconUsers,
  User: IconUser,
  Calendar: IconCalendar,
  Clock: IconClock,
  Bell: IconBell,
  Search: IconSearch,
  Settings: IconSettings,
  Check: IconCheck,
  CheckCircle: IconCheckCircle,
  X: IconX,
  AlertCircle: IconAlertCircle,
  AlertTriangle: IconAlertTriangle,
  Info: IconInfo,
  Star: IconStar,
  StarFilled: IconStarFilled,
  ChevronDown: IconChevronDown,
  ChevronUp: IconChevronUp,
  ChevronLeft: IconChevronLeft,
  ChevronRight: IconChevronRight,
  ArrowRight: IconArrowRight,
  ArrowLeft: IconArrowLeft,
  ArrowUp: IconArrowUp,
  ArrowDown: IconArrowDown,
  Plus: IconPlus,
  Minus: IconMinus,
  Edit: IconEdit,
  Trash: IconTrash,
  Copy: IconCopy,
  ExternalLink: IconExternalLink,
  RefreshCw: IconRefreshCw,
  Download: IconDownload,
  Upload: IconUpload,
  Lock: IconLock,
  Unlock: IconUnlock,
  Key: IconKey,
  Shield: IconShield,
  Code: IconCode,
  Terminal: IconTerminal,
  Cpu: IconCpu,
  FileText: IconFileText,
  Folder: IconFolder,
  Award: IconAward,
  Trophy: IconTrophy,
  Sparkles: IconSparkles,
  Zap: IconZap,
  Activity: IconActivity,
  Eye: IconEye,
  EyeOff: IconEyeOff,
  Filter: IconFilter,
  Grid: IconGrid,
  List: IconList,
  LogOut: IconLogOut,
  MoreHorizontal: IconMoreHorizontal,
  MoreVertical: IconMoreVertical,
  Sun: IconSun,
  Moon: IconMoon,
  Maximize: IconMaximize,
  Minimize: IconMinimize,
  CheckSquare: IconCheckSquare,
  Square: IconSquare,
  Bookmark: IconBookmark,
  Play: IconPlay,
  Pause: IconPause,
  QrCode: IconQrCode,
  HelpCircle: IconHelpCircle,
  Compass: IconCompass,
  Layers: IconLayers,
  PieChart: IconPieChart,
  BarChart2: IconBarChart2,
  TrendingUp: IconTrendingUp,
  TrendingDown: IconTrendingDown,
  MessageSquare: IconMessageSquare,
  Send: IconSend,
  Share2: IconShare2,
  Printer: IconPrinter,
  Mail: IconMail,
  Phone: IconPhone,
  Database: IconDatabase,
  Server: IconServer,
  Wifi: IconWifi,
  WifiOff: IconWifiOff,
};

export function DynamicModernIcon({ name, ...props }: ModernIconProps & { name: ModernIconName }) {
  const Component = MODERN_ICONS[name] || IconInfo;
  return <Component {...props} />;
}
