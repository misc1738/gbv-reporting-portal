-- Enable PostGIS extension for geolocation features
CREATE EXTENSION IF NOT EXISTS postgis;

-- Enable pgcrypto for encryption
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- User roles enum
CREATE TYPE user_role AS ENUM ('adolescent', 'counselor', 'ngo', 'police', 'admin');

-- Report status enum
CREATE TYPE report_status AS ENUM ('submitted', 'under_review', 'assigned', 'in_progress', 'resolved', 'closed');

-- Violence type enum
CREATE TYPE violence_type AS ENUM ('physical', 'sexual', 'emotional', 'economic', 'online', 'other');

-- Risk level enum
CREATE TYPE risk_level AS ENUM ('low', 'medium', 'high', 'critical');

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE,
  phone TEXT,
  role user_role NOT NULL DEFAULT 'adolescent',
  full_name TEXT,
  age INTEGER,
  county TEXT DEFAULT 'Nairobi',
  sub_county TEXT,
  preferred_language TEXT DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true
);

-- Anonymous reports table
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  anonymous_id TEXT, -- For tracking anonymous reports
  violence_type violence_type NOT NULL,
  incident_date TIMESTAMPTZ,
  incident_location TEXT,
  incident_coordinates GEOGRAPHY(POINT, 4326), -- PostGIS for geolocation
  description TEXT NOT NULL,
  status report_status DEFAULT 'submitted',
  risk_level risk_level,
  is_anonymous BOOLEAN DEFAULT true,
  assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Evidence files table (encrypted references)
CREATE TABLE evidence_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID REFERENCES reports(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER,
  storage_path TEXT NOT NULL, -- Encrypted blob storage path
  encryption_key TEXT NOT NULL, -- Encrypted with master key
  uploaded_at TIMESTAMPTZ DEFAULT NOW(),
  uploaded_by UUID REFERENCES users(id) ON DELETE SET NULL
);

-- Risk assessments table
CREATE TABLE risk_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID REFERENCES reports(id) ON DELETE CASCADE,
  immediate_danger BOOLEAN DEFAULT false,
  has_weapons BOOLEAN DEFAULT false,
  threats_made BOOLEAN DEFAULT false,
  previous_violence BOOLEAN DEFAULT false,
  substance_abuse BOOLEAN DEFAULT false,
  isolation BOOLEAN DEFAULT false,
  financial_control BOOLEAN DEFAULT false,
  risk_score INTEGER, -- 0-100
  risk_level risk_level,
  recommendations TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Safety plans table
CREATE TABLE safety_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID REFERENCES reports(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  emergency_contacts JSONB, -- Array of contacts
  safe_locations JSONB, -- Array of safe places
  escape_plan TEXT,
  important_documents JSONB, -- List of documents to gather
  financial_resources TEXT,
  support_network JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Service providers table
CREATE TABLE service_providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- 'counseling', 'legal', 'medical', 'shelter', 'police'
  description TEXT,
  address TEXT,
  coordinates GEOGRAPHY(POINT, 4326),
  phone TEXT,
  email TEXT,
  website TEXT,
  operating_hours JSONB,
  services_offered JSONB,
  county TEXT DEFAULT 'Nairobi',
  sub_county TEXT,
  is_verified BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Referrals table
CREATE TABLE referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID REFERENCES reports(id) ON DELETE CASCADE,
  service_provider_id UUID REFERENCES service_providers(id) ON DELETE CASCADE,
  referred_by UUID REFERENCES users(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'accepted', 'completed', 'declined'
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Case updates table
CREATE TABLE case_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID REFERENCES reports(id) ON DELETE CASCADE,
  updated_by UUID REFERENCES users(id) ON DELETE SET NULL,
  update_type TEXT, -- 'status_change', 'note', 'referral', 'contact'
  message TEXT NOT NULL,
  is_visible_to_reporter BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notifications table
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  report_id UUID REFERENCES reports(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- 'case_update', 'referral', 'message', 'alert'
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Learning modules table
CREATE TABLE learning_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  content JSONB, -- Structured content with sections
  category TEXT, -- 'rights', 'safety', 'support', 'prevention'
  difficulty_level TEXT DEFAULT 'beginner', -- 'beginner', 'intermediate', 'advanced'
  estimated_time INTEGER, -- in minutes
  points INTEGER DEFAULT 10,
  sdg_alignment TEXT[], -- SDG 4, 5, 16 alignment
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User progress table (gamification)
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  module_id UUID REFERENCES learning_modules(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT false,
  score INTEGER,
  time_spent INTEGER, -- in seconds
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, module_id)
);

-- Badges table
CREATE TABLE badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  criteria JSONB, -- Conditions to earn the badge
  points INTEGER DEFAULT 50,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User badges table
CREATE TABLE user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  badge_id UUID REFERENCES badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

-- Create indexes for performance
CREATE INDEX idx_reports_user_id ON reports(user_id);
CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_reports_created_at ON reports(created_at);
CREATE INDEX idx_reports_coordinates ON reports USING GIST(incident_coordinates);
CREATE INDEX idx_service_providers_coordinates ON service_providers USING GIST(coordinates);
CREATE INDEX idx_service_providers_type ON service_providers(type);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
