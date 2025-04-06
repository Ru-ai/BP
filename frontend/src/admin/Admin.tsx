import { Users, Mail, Phone, Building2, BarChart3, Briefcase } from 'lucide-react';
import { useCustomerStore, User } from '../store/useCustomerStore';

function UserRow({ user }: { user: User }) {
  return (
    <div className={`p-4 rounded-lg mb-4 ${
      user.qualified ? 'bg-green-500/5' : 'bg-red-500/5'
    }`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-indigo-400 shrink-0" />
            <h3 className="text-lg font-semibold text-white">{user.fullName}</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              user.qualified
                ? 'bg-green-500/20 text-green-400'
                : 'bg-red-500/20 text-red-400'
            }`}>
              {user.qualified ? 'Qualified' : 'Not Qualified'}
            </span>
          </div>
          
          <div className="mt-2 ml-8 space-y-2">
            <div className="flex items-center gap-2 text-gray-300">
              <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
              <a href={`mailto:${user.email}`} className="hover:text-indigo-400 transition-colors">
                {user.email}
              </a>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>{user.phoneNo}</span>
            </div>
          </div>
        </div>
        
        <div className="ml-8 md:ml-0 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2 text-gray-300">
            <BarChart3 className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>{user.monthlyRevenue}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <Building2 className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>{user.companySize} employees</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <Briefcase className="w-4 h-4 text-indigo-400 shrink-0" />
            <span className="capitalize">{user.industry}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Admin() {
  const { data } = useCustomerStore();
  const users = data;
  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">User Profiles</h1>
        <div className="space-y-2">
          {users.map((user, index) => (
            <UserRow key={index} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Admin;