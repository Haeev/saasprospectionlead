export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string
          company_name: string
          contact_name: string
          email: string
          phone: string | null
          website: string | null
          industry: string | null
          company_size: string | null
          annual_revenue: string | null
          status: string
          notes: string | null
          created_at: string
          updated_at: string
          created_by: string | null
          assigned_to: string | null
        }
        Insert: {
          id?: string
          company_name: string
          contact_name: string
          email: string
          phone?: string | null
          website?: string | null
          industry?: string | null
          company_size?: string | null
          annual_revenue?: string | null
          status?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
          created_by?: string | null
          assigned_to?: string | null
        }
        Update: {
          id?: string
          company_name?: string
          contact_name?: string
          email?: string
          phone?: string | null
          website?: string | null
          industry?: string | null
          company_size?: string | null
          annual_revenue?: string | null
          status?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
          created_by?: string | null
          assigned_to?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_assigned_to_fkey"
            columns: ["assigned_to"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          display_name: string | null
          avatar_url: string | null
          role: string
          notification_email: boolean
          notification_web: boolean
          created_at: string
          updated_at: string
          last_sign_in: string | null
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          display_name?: string | null
          avatar_url?: string | null
          role?: string
          notification_email?: boolean
          notification_web?: boolean
          created_at?: string
          updated_at?: string
          last_sign_in?: string | null
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          display_name?: string | null
          avatar_url?: string | null
          role?: string
          notification_email?: boolean
          notification_web?: boolean
          created_at?: string
          updated_at?: string
          last_sign_in?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          industry: string[] | null
          company_size: string[] | null
          location: string[] | null
          location_radius: number | null
          min_annual_revenue: number | null
          max_annual_revenue: number | null
          min_company_age: number | null
          max_company_age: number | null
          has_website: boolean | null
          has_social_media: boolean | null
          naf_codes: string[] | null
          keywords: string[] | null
          is_default: boolean
          created_at: string
          updated_at: string
          last_used_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          industry?: string[] | null
          company_size?: string[] | null
          location?: string[] | null
          location_radius?: number | null
          min_annual_revenue?: number | null
          max_annual_revenue?: number | null
          min_company_age?: number | null
          max_company_age?: number | null
          has_website?: boolean | null
          has_social_media?: boolean | null
          naf_codes?: string[] | null
          keywords?: string[] | null
          is_default?: boolean
          created_at?: string
          updated_at?: string
          last_used_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          industry?: string[] | null
          company_size?: string[] | null
          location?: string[] | null
          location_radius?: number | null
          min_annual_revenue?: number | null
          max_annual_revenue?: number | null
          min_company_age?: number | null
          max_company_age?: number | null
          has_website?: boolean | null
          has_social_media?: boolean | null
          naf_codes?: string[] | null
          keywords?: string[] | null
          is_default?: boolean
          created_at?: string
          updated_at?: string
          last_used_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      search_history: {
        Row: {
          id: string
          user_id: string
          profile_id: string | null
          search_params: Json
          search_name: string | null
          results_count: number
          created_at: string
          is_favorite: boolean
          is_saved: boolean
        }
        Insert: {
          id?: string
          user_id: string
          profile_id?: string | null
          search_params: Json
          search_name?: string | null
          results_count?: number
          created_at?: string
          is_favorite?: boolean
          is_saved?: boolean
        }
        Update: {
          id?: string
          user_id?: string
          profile_id?: string | null
          search_params?: Json
          search_name?: string | null
          results_count?: number
          created_at?: string
          is_favorite?: boolean
          is_saved?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "search_history_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "search_history_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      lead_status: {
        Row: {
          id: string
          lead_id: string
          user_id: string
          status: string
          notes: string | null
          next_action: string | null
          next_action_date: string | null
          last_contact_date: string | null
          last_contact_method: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          lead_id: string
          user_id: string
          status?: string
          notes?: string | null
          next_action?: string | null
          next_action_date?: string | null
          last_contact_date?: string | null
          last_contact_method?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          lead_id?: string
          user_id?: string
          status?: string
          notes?: string | null
          next_action?: string | null
          next_action_date?: string | null
          last_contact_date?: string | null
          last_contact_method?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lead_status_lead_id_fkey"
            columns: ["lead_id"]
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_status_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
} 