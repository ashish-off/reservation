import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  Users, 
  ChevronRight, 
  Check, 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  Utensils,
  CheckCircle,
  MapPin,
  Armchair,
  Sun,
  MessageSquare,
  CreditCard,
  Wallet
} from 'lucide-react';

// --- Types ---
interface ReservationData {
  date: string;
  time: string;
  guests: number;
  name: string;
  email: string;
  phone: string;
  specialRequests: string;
  tableId: string | null;
  tableName: string;
  cost: number;
  paymentMethod: 'now' | 'later';
}

interface TableOption {
  id: string;
  name: string;
  description: string;
  features: string[];
  color: string;
  cost: number;
}

interface FormErrors {
  [key: string]: string;
}

// --- Component ---
export default function ReservationComponent() {
  // Steps: 1=Search, 2=Select Table, 3=Details, 4=Success
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  
  const [formData, setFormData] = useState<ReservationData>({
    date: '',
    time: '',
    guests: 2,
    name: '',
    email: '',
    phone: '',
    specialRequests: '',
    tableId: null,
    tableName: '',
    cost: 0,
    paymentMethod: 'now'
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Expanded available times (3 PM to 1 AM)
  const timeSlots = [
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", 
    "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", 
    "21:00", "21:30", "22:00", "22:30", "23:00", "23:30", 
    "00:00", "00:30", "01:00"
  ];

  // Table Options with Costs
  const tableOptions: TableOption[] = [
    {
      id: 'premium-stage',
      name: 'Premium Stage',
      description: 'Center of the action with live piano view.',
      features: ['High Visibility', 'Near Stage'],
      color: 'from-amber-500 to-orange-600',
      cost: 25
    },
    {
      id: 'window-garden',
      name: 'Window Garden',
      description: 'Quiet corner with a view of the patio.',
      features: ['Natural Light', 'Quiet Area'],
      color: 'from-emerald-500 to-teal-600',
      cost: 0
    },
    {
      id: 'private-booth',
      name: 'Private Booth',
      description: 'Cozy semi-private seating for intimate dining.',
      features: ['Plush Seating', 'Semi-Private'],
      color: 'from-stone-600 to-stone-800',
      cost: 15
    }
  ];

  // Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Step 1: Check Availability
  const handleCheckAvailability = () => {
    const newErrors: FormErrors = {};
    if (!formData.date) newErrors.date = "Please select a date";
    if (!formData.time) newErrors.time = "Please select a time";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setDirection('forward');
      setStep(2); 
    }, 800);
  };

  // Step 2: Select Table
  const handleSelectTable = (table: TableOption) => {
    setFormData(prev => ({
      ...prev,
      tableId: table.id,
      tableName: table.name,
      cost: table.cost
    }));
    setDirection('forward');
    setStep(3); 
  };

  // Step 3: Confirm Reservation
  const handleConfirmReservation = () => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Please enter a valid email";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setDirection('forward');
      setStep(4);
    }, 1500);
  };

  const handleBack = () => {
    setDirection('backward');
    setStep(prev => (prev - 1) as 1 | 2 | 3);
  };

  return (
    <section className="border border-violet-800 min-h-[75vh] w-full max-w-6xl md:mx-auto px-4 py-8 flex items-center justify-center p-4 font-sans text-stone-800" id="reservation">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 relative">
        
        {/* Decorative Header */}
        <div className="h-32 bg-stone-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-stone-800 to-stone-900 opacity-90"></div>
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-amber-600 rounded-full mix-blend-overlay opacity-20 blur-3xl"></div>
          <div className="absolute -left-10 bottom-0 w-32 h-32 bg-amber-500 rounded-full mix-blend-overlay opacity-20 blur-2xl"></div>
          
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
            <div className="flex items-center gap-2 text-amber-500 mb-1">
              <Utensils size={18} />
              <span className="text-xs font-bold tracking-[0.2em] uppercase">Lumière Dining</span>
            </div>
            <h1 className="text-2xl font-serif text-white tracking-wide">
              {step === 4 ? "Reservation Confirmed" : "Table Reservation"}
            </h1>
          </div>
        </div>

        {/* Progress Bar */}
        {step < 4 && (
          <div className="px-8 pt-6 pb-2">
            <div className="flex items-center justify-between relative">
              <div className="absolute left-0 top-1/2 w-full h-0.5 bg-stone-200 -z-10 transform -translate-y-1/2"></div>
              
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors duration-300 ${step >= 1 ? 'bg-stone-900 border-stone-900 text-white' : 'bg-white border-stone-300 text-stone-400'}`}>
                <span className="text-xs font-bold">1</span>
              </div>
              
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors duration-300 ${step >= 2 ? 'bg-stone-900 border-stone-900 text-white' : 'bg-white border-stone-300 text-stone-400'}`}>
                <span className="text-xs font-bold">2</span>
              </div>

              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors duration-300 ${step >= 3 ? 'bg-stone-900 border-stone-900 text-white' : 'bg-white border-stone-300 text-stone-400'}`}>
                <span className="text-xs font-bold">3</span>
              </div>
            </div>
            <div className="flex justify-between text-[10px] font-medium text-stone-400 mt-2 uppercase tracking-wider">
              <span>Time</span>
              <span className="text-center">Table</span>
              <span>Details</span>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="p-6 md:p-8">
          
          {step === 1 && (
            <div className={`space-y-6 animate-in fade-in slide-in-from-${direction === 'backward' ? 'left' : 'right'}-4 duration-500`}>
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-stone-800">Find a Table</h2>
                <p className="text-stone-500 text-sm mt-1">Select your preferred date and time</p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-500 uppercase tracking-wide ml-1">Date</label>
                <div className={`relative group transition-all duration-300 ${errors.date ? 'shake' : ''}`}>
                  <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-400 group-focus-within:text-amber-600 transition-colors" size={18} />
                  <input 
                    type="date"
                    name="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.date}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3 bg-stone-50 border ${errors.date ? 'border-red-400 bg-red-50' : 'border-stone-200 focus:border-amber-600'} rounded-xl outline-none transition-all text-stone-700`}
                  />
                </div>
                {errors.date && <p className="text-red-500 text-xs ml-1">{errors.date}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-stone-500 uppercase tracking-wide ml-1">Time</label>
                  <div className="relative group">
                    <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-400 group-focus-within:text-amber-600 transition-colors" size={18} />
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className={`w-full pl-12 pr-8 py-3 bg-stone-50 border ${errors.time ? 'border-red-400 bg-red-50' : 'border-stone-200 focus:border-amber-600'} rounded-xl outline-none appearance-none transition-all text-stone-700 cursor-pointer`}
                    >
                      <option value="">Select</option>
                      {timeSlots.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-stone-400">
                      <ChevronRight size={14} className="rotate-90" />
                    </div>
                  </div>
                  {errors.time && <p className="text-red-500 text-xs ml-1">{errors.time}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-stone-500 uppercase tracking-wide ml-1">Guests</label>
                  <div className="relative group">
                    <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-400 group-focus-within:text-amber-600 transition-colors" size={18} />
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full pl-12 pr-8 py-3 bg-stone-50 border border-stone-200 focus:border-amber-600 rounded-xl outline-none appearance-none transition-all text-stone-700 cursor-pointer"
                    >
                      {[1,2,3,4,5,6,7,8].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                      ))}
                      <option value="9+">9+ (Call us)</option>
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-stone-400">
                      <ChevronRight size={14} className="rotate-90" />
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckAvailability}
                disabled={isLoading}
                className="w-full mt-6 py-4 bg-stone-900 hover:bg-stone-800 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  <>
                    <span>Check Availability</span>
                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          )}

          {step === 2 && (
            <div className={`space-y-5 animate-in fade-in slide-in-from-${direction === 'backward' ? 'left' : 'right'}-4 duration-500`}>
              <div className="flex items-center justify-between mb-2">
                 <button onClick={handleBack} className="text-stone-400 hover:text-stone-600 transition-colors p-2 -ml-2">
                  <ArrowLeft size={20} />
                </button>
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-stone-800">3 Tables Found</h2>
                  <p className="text-stone-500 text-xs mt-0.5">Select a seating area</p>
                </div>
                <div className="w-9"></div>
              </div>

              <div className="space-y-3">
                {tableOptions.map((table) => (
                  <button
                    key={table.id}
                    onClick={() => handleSelectTable(table)}
                    className="w-full group bg-white border border-stone-200 hover:border-amber-500 rounded-2xl p-3 text-left transition-all duration-300 hover:shadow-md flex items-center gap-4 overflow-hidden"
                  >
                    <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${table.color} flex-shrink-0 flex items-center justify-center text-white shadow-inner relative overflow-hidden`}>
                       <div className="absolute inset-0 bg-black/10"></div>
                       {table.id === 'premium-stage' && <MapPin size={24} className="relative z-10" />}
                       {table.id === 'window-garden' && <Sun size={24} className="relative z-10" />}
                       {table.id === 'private-booth' && <Armchair size={24} className="relative z-10" />}
                    </div>
                    
                    <div className="flex-1 py-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-stone-800 group-hover:text-amber-700 transition-colors">{table.name}</h3>
                        <div className="flex flex-col items-end">
                          <span className="text-[10px] bg-stone-100 text-stone-500 px-2 py-1 rounded-full uppercase tracking-wide font-medium">Available</span>
                          <span className={`text-xs font-bold mt-1 ${table.cost > 0 ? 'text-amber-600' : 'text-stone-400'}`}>
                            {table.cost > 0 ? `$${table.cost}` : 'Free'}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-stone-500 mt-0 line-clamp-1">{table.description}</p>
                      <div className="flex gap-2 mt-2">
                        {table.features.map(feature => (
                          <span key={feature} className="text-[10px] text-stone-400 font-medium">• {feature}</span>
                        ))}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className={`space-y-5 animate-in fade-in slide-in-from-${direction === 'backward' ? 'left' : 'right'}-4 duration-500`}>
              {/* Summary Card */}
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs flex justify-between items-center">
                <div>
                  <span className="font-bold text-stone-800">{formData.tableName}</span> 
                  <span className="text-stone-500"> • {formData.date} at {formData.time}</span>
                </div>
                <div className="text-amber-600 font-bold bg-amber-50 px-2 py-1 rounded-md">
                  {formData.cost > 0 ? `$${formData.cost}` : 'Free'}
                </div>
              </div>

              <div className="text-center mb-2">
                <h2 className="text-xl font-semibold text-stone-800">Your Details</h2>
              </div>

              <div className="space-y-3">
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-400" size={18} />
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3 bg-stone-50 border ${errors.name ? 'border-red-400 bg-red-50' : 'border-stone-200 focus:border-amber-600'} rounded-xl outline-none transition-all`}
                  />
                  {errors.name && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-400" size={18} />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-12 pr-4 py-3 bg-stone-50 border ${errors.email ? 'border-red-400 bg-red-50' : 'border-stone-200 focus:border-amber-600'} rounded-xl outline-none transition-all`}
                    />
                  </div>

                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-400" size={18} />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full pl-12 pr-4 py-3 bg-stone-50 border ${errors.phone ? 'border-red-400 bg-red-50' : 'border-stone-200 focus:border-amber-600'} rounded-xl outline-none transition-all`}
                    />
                  </div>
                </div>

                {/* Special Request */}
                <div className="relative group">
                   <MessageSquare className="absolute left-4 top-3.5 text-stone-300" size={16} />
                   <textarea 
                      name="specialRequests" 
                      placeholder="Add a special request (optional)..." 
                      value={formData.specialRequests} 
                      onChange={handleChange} 
                      className="w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 focus:border-amber-600 rounded-xl outline-none text-sm h-20 resize-none transition-all placeholder-stone-400" 
                   />
                </div>

                {/* Payment Selection (Only if cost > 0) */}
                {formData.cost > 0 && (
                  <div className="pt-2">
                    <p className="text-[10px] font-bold text-stone-400 uppercase mb-2 ml-1">Payment Method</p>
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => setFormData(p => ({...p, paymentMethod: 'now'}))} 
                        className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-medium transition-all ${formData.paymentMethod === 'now' ? 'bg-stone-900 border-stone-900 text-white shadow-md' : 'bg-white border-stone-200 text-stone-500 hover:bg-stone-50'}`}
                      >
                        <CreditCard size={14} /> Pay Now
                      </button>
                      <button 
                        onClick={() => setFormData(p => ({...p, paymentMethod: 'later'}))} 
                        className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-medium transition-all ${formData.paymentMethod === 'later' ? 'bg-stone-900 border-stone-900 text-white shadow-md' : 'bg-white border-stone-200 text-stone-500 hover:bg-stone-50'}`}
                      >
                        <Wallet size={14} /> At Table
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3 mt-6">
                <button onClick={handleBack} className="px-6 py-4 bg-white border border-stone-200 text-stone-600 rounded-xl hover:bg-stone-50"><ArrowLeft size={20} /></button>
                <button onClick={handleConfirmReservation} disabled={isLoading} className="flex-1 py-4 bg-stone-900 text-white rounded-xl shadow-lg flex items-center justify-center gap-2 hover:bg-stone-800 transition-colors">
                  {isLoading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : `Confirm ($${formData.cost})`}
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-4 animate-in zoom-in duration-500">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-green-600" size={32} />
              </div>
              <h2 className="text-xl font-serif font-bold text-stone-800">Reservation Secured</h2>
              <p className="text-stone-500 text-xs mt-1">Confirmation sent to {formData.email}</p>
              
              <div className="mt-6 bg-stone-50 rounded-2xl p-5 text-left border border-stone-100 space-y-3 shadow-sm">
                <div className="flex justify-between text-xs border-b border-stone-200 pb-2">
                  <span className="text-stone-400 font-medium">Booking Fee</span>
                  <span className="font-bold text-stone-800">${formData.cost}</span>
                </div>
                <div className="flex justify-between text-xs border-b border-stone-200 pb-2">
                  <span className="text-stone-400 font-medium">Payment Status</span>
                  <span className={`font-bold capitalize ${formData.paymentMethod === 'now' ? 'text-green-600' : 'text-amber-600'}`}>
                    {formData.cost === 0 ? 'Free' : formData.paymentMethod === 'now' ? 'Paid via Card' : 'Pay at Restaurant'}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-[11px] pt-1">
                  <div>
                    <p className="text-stone-400 font-medium uppercase tracking-wider">Date & Time</p>
                    <p className="font-bold text-stone-700 mt-0.5">{formData.date} • {formData.time}</p>
                  </div>
                  <div>
                    <p className="text-stone-400 font-medium uppercase tracking-wider">Table</p>
                    <p className="font-bold text-stone-700 mt-0.5">{formData.tableName}</p>
                  </div>
                </div>

                {formData.specialRequests && (
                  <div className="pt-2 border-t border-stone-200 mt-2">
                    <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider mb-1">Special Request</p>
                    <p className="text-xs text-stone-600 italic bg-white p-2 rounded border border-stone-100">"{formData.specialRequests}"</p>
                  </div>
                )}
              </div>
              <button onClick={() => window.location.reload()} className="mt-6 text-amber-600 text-xs font-bold uppercase tracking-widest hover:text-amber-700 transition-colors">Back to Home</button>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-4px); } 75% { transform: translateX(4px); } }
        .shake { animation: shake 0.3s ease-in-out; }
      `}</style>
    </section>
  );
}