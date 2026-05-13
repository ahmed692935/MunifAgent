export interface PlanFormData {
  user?: string | null;
  name: string;
  price: number | null;
  features: string;
  description: string;
  user_id: number | null;
  email: string;
  included_minutes: number | null;
  is_active: string;
}
