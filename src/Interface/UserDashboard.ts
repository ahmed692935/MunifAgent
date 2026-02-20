
export interface UserDashboard {
    is_active: boolean;
    status_text: string;
    total_calls: number;
    missed_calls: number;
    used_minutes: number;
    total_minutes: number;
    percentage: number;
    reset_in_days: number;
}

export interface PlanUsageData {
    used_minutes: number;
    total_minutes: number;
    percentage: number;
    
    is_active?: boolean;
    status_text?: string;
    total_calls?: number;
    missed_calls?: number;
    reset_in_days?: number;
}

export interface PlanUsageResponse {
    success: boolean;
    data: PlanUsageData;
}

export interface AgentStatus {
    is_active: boolean;
    status_text: string;
    currently_handling: boolean;
}

export interface TodaysActivity {
    total_calls: number;
    missed_calls: number;
}

export interface PlanUsage {
    used_minutes: number;
    total_minutes: number;
    percentage: number;
    reset_in_days: number;
}

export interface UserDashboardData {
    agent_status: AgentStatus;
    todays_activity: TodaysActivity;
    plan_usage: PlanUsage;
}

export interface DashboardResponse {
    success: boolean;
    data: UserDashboardData;
}

//  Recent Action in User Dashboard
// export interface ActionItem {
//     id: number;
//     icon: React.ReactNode;
//     iconBg: string;
//     iconColor: string;
//     description: string;
//     time_ago: string;
// }

export interface ActionItem {
    type: string;
    icon: string; // API se string aayegi
    description: string;
    time_ago: string;
    timestamp?: string | null;
}