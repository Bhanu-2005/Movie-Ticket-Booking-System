import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { movieService } from '../../services/movieService';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

export default function EditMovie() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const navigate = useNavigate();
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setIsFetching(true);
        const res = await movieService.getMovieById(id);
        if (res.data) {
          reset({
            title: res.data.title,
            genre: res.data.genre,
            language: res.data.language,
            duration: res.data.duration || res.data.duration_minutes,
            release_date: res.data.release_date,
            description: res.data.description,
            poster_url: res.data.poster_url || ''
          });
        }
      } catch (error) {
        toast.error('Failed to load movie details');
        navigate('/dashboard/movies');
      } finally {
        setIsFetching(false);
      }
    };
    fetchMovie();
  }, [id, reset, navigate]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const payload = {
        ...data,
        duration: parseInt(data.duration, 10)
      };
      
      await movieService.updateMovie(id, payload);
      toast.success('Movie updated successfully!');
      navigate('/dashboard/movies');
    } catch (error) {
      console.error('Failed to update movie:', error);
      toast.error('Failed to update movie. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#DC2626]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto pb-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Edit Movie</h1>
        <p className="text-gray-400 mt-2">Update details for the selected movie.</p>
      </div>

      <div className="bg-[#0F172A]/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Movie Title"
            type="text"
            placeholder="e.g. Inception"
            {...register('title', { 
              required: 'Title is required',
              minLength: { value: 2, message: 'Title must be at least 2 characters' }
            })}
            error={errors.title?.message}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Genre"
              type="text"
              placeholder="e.g. Action, Sci-Fi"
              {...register('genre', { required: 'Genre is required' })}
              error={errors.genre?.message}
            />
            
            <Input
              label="Language"
              type="text"
              placeholder="e.g. English"
              {...register('language', { required: 'Language is required' })}
              error={errors.language?.message}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Duration (minutes)"
              type="number"
              placeholder="e.g. 148"
              {...register('duration', { 
                required: 'Duration is required',
                min: { value: 1, message: 'Duration must be greater than 0' }
              })}
              error={errors.duration?.message}
            />
            
            <Input
              label="Release Date"
              type="date"
              {...register('release_date', { required: 'Release date is required' })}
              error={errors.release_date?.message}
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-300">Description</label>
            <textarea
              className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-transparent transition-all"
              rows={4}
              placeholder="Movie description..."
              {...register('description', { required: 'Description is required' })}
            ></textarea>
            {errors.description && (
              <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>
            )}
          </div>

          <Input
            label="Poster URL"
            type="text"
            placeholder="e.g. /images/image.png"
            {...register('poster_url')}
          />

          <div className="pt-4 flex justify-end">
            <Button type="button" variant="outline" className="mr-4" onClick={() => navigate('/dashboard/movies')}>
              Cancel
            </Button>
            <Button type="submit" isLoading={isLoading}>
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
