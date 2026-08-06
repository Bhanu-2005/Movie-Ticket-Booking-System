import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { adminService } from '../../services/adminService';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { FiMonitor } from 'react-icons/fi';

export default function ManageTheaters() {
  const [theaters, setTheaters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    fetchTheaters();
  }, []);

  const fetchTheaters = async () => {
    try {
      setIsFetching(true);
      const res = await adminService.getAllTheatres();
      setTheaters(res.data || []);
    } catch (error) {
      toast.error('Failed to load theaters');
    } finally {
      setIsFetching(false);
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const payload = {
        ...data,
        total_screens: parseInt(data.total_screens, 10)
      };
      await adminService.addTheatre(payload);
      toast.success('Theater added successfully!');
      reset();
      fetchTheaters();
    } catch (error) {
      toast.error('Failed to add theater');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pb-10 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center">
          <FiMonitor className="mr-3 text-[#DC2626]" /> Manage Theaters
        </h1>
        <p className="text-gray-400 mt-2">Add new theaters and view existing ones.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-[#0F172A]/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Add Theater</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Name"
                placeholder="PVR Cinemas"
                {...register('name', { required: 'Name is required' })}
                error={errors.name?.message}
              />
              <Input
                label="City"
                placeholder="New York"
                {...register('city', { required: 'City is required' })}
                error={errors.city?.message}
              />
              <Input
                label="Address"
                placeholder="123 Main St"
                {...register('address', { required: 'Address is required' })}
                error={errors.address?.message}
              />
              <Input
                label="Total Screens"
                type="number"
                placeholder="6"
                {...register('total_screens', { required: 'Screens required', min: 1 })}
                error={errors.total_screens?.message}
              />
              <Button type="submit" isLoading={isLoading} className="w-full mt-4">
                Add Theater
              </Button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-[#0F172A]/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Existing Theaters</h2>
            {isFetching ? (
              <p className="text-gray-400">Loading theaters...</p>
            ) : theaters.length > 0 ? (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {theaters.map((t) => (
                  <div key={t.id || t._id} className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-bold text-white">{t.name}</h3>
                      <p className="text-sm text-gray-400">{t.address}, {t.city}</p>
                    </div>
                    <div className="bg-gray-900 px-3 py-1 rounded text-sm text-gray-300 font-medium">
                      {t.total_screens} Screens
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No theaters found. Add one to get started!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
