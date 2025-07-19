import { User } from '@/models/auth/User.model';
import bcrypt from 'bcryptjs';

export async function ensureSuperAdmin() {
  const superAdminEmail = process.env.SUPERADMIN_EMAIL;
  
  if (!superAdminEmail) {
    throw new Error('SUPERADMIN_EMAIL is not set in environment variables');
  }

  const existingSuperAdmin = await User.findOne({ email: superAdminEmail });
  
  if (!existingSuperAdmin) {
    const hashedPassword = await bcrypt.hash('Admin@123', 12);
    
    await User.create({
      name: 'Super Admin',
      email: superAdminEmail,
      password: hashedPassword,
      role: 'super-admin',
      status: 'active',
      isVerified: true,
    });
    
    console.log('Super admin user created');
  }
}