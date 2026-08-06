import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { adminService } from '../../services/adminService';
import { movieService } from '../../services/movieService';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { FiVideo } from 'react-icons/fi';

export default function ManageShows() {
  const [shows, setShows] = useState([]);
  const [movies, setMovies] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [screens, setScreens] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsFetching(true);
      const [showsRes, moviesRes, theatersRes, screensRes] = await Promise.all([
        adminService.getAllShows(),
        movieService.getAllMovies(),
        adminService.getAllTheatres(),
        adminService.getAllScreens()
      ]);
      setShows(showsRes.data || []);
      setMovies(moviesRes.data || []);
      setTheaters(theatersRes.data || []);
      setScreens(screensRes.data || []);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setIsFetching(false);
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const payload = {
        ...data,
        ticket_price: parseFloat(data.ticket_price)
      };
      await adminService.addShow(payload);
      toast.success('Show added successfully!');
      reset();
      fetchData();
    } catch (error) {
      toast.error('Failed to add show');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pb-10 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center">
          <FiVideo className="mr-3 text-[#DC2626]" /> Manage Shows
        </h1>
        <p className="text-gray-400 mt-2">Add new shows and view existing ones.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-[#0F172A]/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Add Show</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Movie</label>
                <select 
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white"
                  {...register('movie_id', { required: 'Movie is required' })}>
                  <option value="">Select Movie</option>
                  {movies.map(m => <option key={m.id || m._id} value={m.id || m._id}>{m.title}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Theater</label>
                <select 
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white"
                  {...register('theatre_id', { required: 'Theater is required' })}>
                  <option value="">Select Theater</option>
                  {theaters.map(t => <option key={t.id || t._id} value={t.id || t._id}>{t.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Screen</label>
                <select 
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white"
                  {...register('screen_id', { required: 'Screen is required' })}>
                  <option value="">Select Screen</option>
                  {screens.map(s => <option key={s.id || s._id} value={s.id || s._id}>{s.name}</option>)}
                </select>
              </div>
              <Input type="date" label="Show Date" {...register('show_date', { required: 'Date is required' })} />
              <Input type="time" label="Show Time" {...register('show_time', { required: 'Time is required' })} />
              <Input type="number" step="0.01" label="Ticket Price ($)" placeholder="15.00" {...register('ticket_price', { required: 'Price is required' })} />

              <Button type="submit" isLoading={isLoading} className="w-full mt-4">
                Add Show
              </Button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-[#0F172A]/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Existing Shows</h2>
            {isFetching ? (
              <p className="text-gray-400">Loading shows...</p>
            ) : shows.length > 0 ? (
              <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2">
                {shows.map((s) => (
                  <div key={s.id || s._id} className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-bold text-white">Movie ID: {s.movie_id}</h3>
                      <p className="text-sm text-gray-400">Date: {s.show_date} | Time: {s.show_time}</p>
                      <p className="text-xs text-gray-500">Theater ID: {s.theatre_id} | Screen: {s.screen_id}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-500">${s.ticket_price}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No shows found. Add one to get started!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
