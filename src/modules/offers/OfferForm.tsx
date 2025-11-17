import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { createOffer } from './api'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../../components/ui/Toaster'

const schema = z.object({
  title: z.string().min(3, 'Title must have at least 3 characters'),
  description: z.string().min(10, 'Description must have at least 10 characters'),
  budget: z.number().positive('Budget must be positive'),
})

type FormValues = z.infer<typeof schema>

export function OfferForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const navigate = useNavigate()
  const { toast } = useToast()

  async function onSubmit(values: FormValues) {
    try {
      await createOffer(values)
      toast('Offer created')
      navigate('/offers')
    } catch {
      toast('Error creating offer')
    }
  }

  return (
    <div className="max-w-lg mx-auto bg-white border rounded-2xl p-6 shadow">
      <h1 className="text-2xl font-semibold mb-4">New Offer</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <label className="block text-sm mb-1">Title</label>
          <input className="w-full border rounded-md px-3 py-2" {...register('title')} />
          {errors.title && <p className="text-sm text-red-600">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block text-sm mb-1">Description</label>
          <textarea rows={6} className="w-full border rounded-md px-3 py-2" {...register('description')} />
          {errors.description && <p className="text-sm text-red-600">{errors.description.message}</p>}
        </div>

        <div>
          <label className="block text-sm mb-1">Budget (S/)</label>
          <input
            type="number"
            step="0.01"
            className="w-full border rounded-md px-3 py-2"
            {...register('budget', { valueAsNumber: true })}
          />
          {errors.budget && <p className="text-sm text-red-600">{errors.budget.message}</p>}
        </div>

        <button
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white rounded-md py-2 disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  )
}
