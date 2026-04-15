import { useEffect, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { getDestinations } from "../lib/api";
import api from "../lib/api";
import toast from 'react-hot-toast';

export default function AdminDashboard() {
    const { authUser } = useOutletContext();
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('add'); // 'add' or 'manage'
    const [activeTab, setActiveTab] = useState('destinations');
    const [destinations, setDestinations] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    // Form states
    const [destForm, setDestForm] = useState({
        name: '', city: '', state: '', description: '', basePrice: '', tags: '', images: ''
    });
    const [hotelForm, setHotelForm] = useState({
        name: '', destinationId: '', pricePerNight: '', amenities: '', images: '', rooms: ''
    });
    const [flightForm, setFlightForm] = useState({
        airline: '', destinationId: '', sourceCity: '', price: '', duration: '', seats: ''
    });

    // Image upload states
    const [uploadedImages, setUploadedImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [editingDestination, setEditingDestination] = useState(null);

    // Handle image upload
    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        setUploading(true);

        try {
            const uploadPromises = files.map(async (file) => {
                const formData = new FormData();
                formData.append('image', file);

                const response = await api.post('/api/upload', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                return response.data.url;
            });

            const urls = await Promise.all(uploadPromises);
            setUploadedImages([...uploadedImages, ...urls]);
            setDestForm({ ...destForm, images: [...uploadedImages, ...urls].join(',') });
            toast.success('Images uploaded successfully!');
        } catch (error) {
            console.error('Upload error:', error);
            toast.error('Failed to upload images: ' + (error.response?.data?.message || error.message));
        } finally {
            setUploading(false);
        }
    };

    const removeImage = (index) => {
        const newImages = uploadedImages.filter((_, i) => i !== index);
        setUploadedImages(newImages);
        setDestForm({ ...destForm, images: newImages.join(',') });
    };

    useEffect(() => {
        if (!authUser || authUser.role !== 'ADMIN') {
            toast.error("Access Denied: You are not an Admin");
            navigate("/");
            return;
        }
        fetchDestinations();
        fetchBookings();
    }, [authUser, navigate]);

    const fetchDestinations = async () => {
        try {
            const data = await getDestinations();
            setDestinations(data);
        } catch (error) {
            console.error("Failed to fetch destinations:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchBookings = async () => {
        try {
            const response = await api.get('/admin/bookings');
            setBookings(response.data);
        } catch (error) {
            console.error("Failed to fetch bookings:", error);
        }
    };

    const handleAddDestination = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...destForm,
                basePrice: Number(destForm.basePrice),
                tags: destForm.tags.split(',').map(t => t.trim()).filter(t => t),
                images: destForm.images.split(',').map(i => i.trim()).filter(i => i)
            };

            if (editingDestination) {
                // Update existing destination
                await api.put(`/admin/destination/${editingDestination._id}`, payload);
                toast.success('Destination updated successfully!');
                setEditingDestination(null);
            } else {
                // Create new destination
                await api.post('/admin/destination', payload);
                toast.success('Destination added successfully!');
            }

            setDestForm({ name: '', city: '', state: '', description: '', basePrice: '', tags: '', images: '' });
            setUploadedImages([]);
            await fetchDestinations();
            
            // Switch to manage section so admin sees the new destination card immediately
            setActiveSection('manage');
            setActiveTab('destinations');
        } catch (error) {
            toast.error('Failed to save destination: ' + error.message);
        }
    };

    const handleAddHotel = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...hotelForm,
                pricePerNight: Number(hotelForm.pricePerNight),
                rooms: Number(hotelForm.rooms),
                amenities: hotelForm.amenities.split(',').map(a => a.trim()).filter(a => a),
                images: hotelForm.images.split(',').map(i => i.trim()).filter(i => i)
            };
            await api.post('/admin/hotel', payload);
            toast.success('Hotel added successfully!');
            setHotelForm({ name: '', destinationId: '', pricePerNight: '', amenities: '', images: '', rooms: '' });
            fetchDestinations();
        } catch (error) {
            toast.error('Failed to add hotel: ' + error.message);
        }
    };

    const handleAddFlight = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...flightForm,
                price: Number(flightForm.price),
                seats: Number(flightForm.seats)
            };
            await api.post('/admin/flight', payload);
            toast.success('Flight added successfully!');
            setFlightForm({ airline: '', destinationId: '', sourceCity: '', price: '', duration: '', seats: '' });
            fetchDestinations();
        } catch (error) {
            toast.error('Failed to add flight: ' + error.message);
        }
    };

    const handleEditDestination = (dest) => {
        setEditingDestination(dest);
        setDestForm({
            name: dest.name,
            city: dest.city,
            state: dest.state,
            description: dest.description,
            basePrice: dest.basePrice,
            tags: dest.tags?.join(', ') || '',
            images: dest.images?.join(', ') || ''
        });
        setUploadedImages(dest.images || []);
        setActiveSection('add');
        setActiveTab('destinations');
    };

    const handleDeleteDestination = async (id) => {
        if (!window.confirm('Are you sure you want to delete this destination?')) return;
        try {
            await api.delete(`/admin/destination/${id}`);
            toast.success('Destination deleted successfully!');
            fetchDestinations();
        } catch (error) {
            toast.error('Failed to delete destination: ' + error.message);
        }
    };

    const handleCompleteBooking = async (id) => {
        try {
            await api.patch(`/admin/bookings/${id}/complete`);
            toast.success('Booking marked as completed!');
            fetchBookings();
        } catch (error) {
            toast.error('Failed to complete booking: ' + error.message);
        }
    };

    const handleDeleteBooking = async (id) => {
        if (!window.confirm('Are you sure you want to delete this booking?')) return;
        try {
            await api.delete(`/admin/bookings/${id}`);
            toast.success('Booking deleted successfully!');
            fetchBookings();
        } catch (error) {
            toast.error('Failed to delete booking: ' + error.message);
        }
    };

    if (!authUser || authUser.role !== 'ADMIN') return null;

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

                {/* Main Section Tabs: Add vs Manage */}
                <div className="flex space-x-4 mb-6 border-b-2 border-gray-300">
                    <button
                        onClick={() => setActiveSection('add')}
                        className={`px-6 py-3 font-bold text-lg ${activeSection === 'add' ? 'border-b-4 border-blue-600 text-blue-600' : 'text-gray-600'}`}
                    >
                        Add
                    </button>
                    <button
                        onClick={() => setActiveSection('manage')}
                        className={`px-6 py-3 font-bold text-lg ${activeSection === 'manage' ? 'border-b-4 border-blue-600 text-blue-600' : 'text-gray-600'}`}
                    >
                        Manage
                    </button>
                </div>

                {/* ADD SECTION */}
                {activeSection === 'add' && (
                    <div>
                        {/* Sub-tabs for Add */}
                        <div className="flex space-x-4 mb-6 border-b">
                            <button
                                onClick={() => setActiveTab('destinations')}
                                className={`px-4 py-2 font-semibold ${activeTab === 'destinations' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-600'}`}
                            >
                                Destinations
                            </button>
                            <button
                                onClick={() => setActiveTab('hotels')}
                                className={`px-4 py-2 font-semibold ${activeTab === 'hotels' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-600'}`}
                            >
                                Hotels
                            </button>
                            <button
                                onClick={() => setActiveTab('flights')}
                                className={`px-4 py-2 font-semibold ${activeTab === 'flights' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-600'}`}
                            >
                                Flights
                            </button>
                        </div>

                        {/* Add Destination Form */}
                        {activeTab === 'destinations' && (
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-bold">
                                        {editingDestination ? 'Edit Destination' : 'Add New Destination'}
                                    </h2>
                                    {editingDestination && (
                                        <button
                                            onClick={() => {
                                                setEditingDestination(null);
                                                setDestForm({ name: '', city: '', state: '', description: '', basePrice: '', tags: '', images: '' });
                                                setUploadedImages([]);
                                            }}
                                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                                        >
                                            Cancel Edit
                                        </button>
                                    )}
                                </div>
                                <form onSubmit={handleAddDestination} className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="Name" className="border p-2 rounded" value={destForm.name} onChange={(e) => setDestForm({ ...destForm, name: e.target.value })} required />
                                    <input type="text" placeholder="City" className="border p-2 rounded" value={destForm.city} onChange={(e) => setDestForm({ ...destForm, city: e.target.value })} required />
                                    <input type="text" placeholder="State" className="border p-2 rounded" value={destForm.state} onChange={(e) => setDestForm({ ...destForm, state: e.target.value })} required />
                                    <input type="number" placeholder="Base Price" className="border p-2 rounded" value={destForm.basePrice} onChange={(e) => setDestForm({ ...destForm, basePrice: e.target.value })} required />
                                    <textarea placeholder="Description" className="border p-2 rounded col-span-2" value={destForm.description} onChange={(e) => setDestForm({ ...destForm, description: e.target.value })} required />
                                    <input type="text" placeholder="Tags (comma-separated)" className="border p-2 rounded col-span-2" value={destForm.tags} onChange={(e) => setDestForm({ ...destForm, tags: e.target.value })} />

                                    {/* Image Upload Section */}
                                    <div className="col-span-2 border-2 border-dashed border-gray-300 rounded-lg p-4">
                                        <label className="block mb-2 font-semibold text-gray-700">Upload Images</label>
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                            disabled={uploading}
                                        />
                                        {uploading && <p className="text-sm text-blue-600 mt-2">Uploading images...</p>}

                                        {/* Image Preview Gallery */}
                                        {uploadedImages.length > 0 && (
                                            <div className="mt-4 grid grid-cols-3 gap-2">
                                                {uploadedImages.map((url, index) => (
                                                    <div key={index} className="relative group">
                                                        <img src={url} alt={`Preview ${index + 1}`} className="w-full h-24 object-cover rounded" />
                                                        <button
                                                            type="button"
                                                            onClick={() => removeImage(index)}
                                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                        >
                                                            ×
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <button type="submit" className="col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                                        {editingDestination ? 'Update Destination' : 'Add Destination'}
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* Add Hotel Form */}
                        {activeTab === 'hotels' && (
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h2 className="text-xl font-bold mb-4">Add New Hotel</h2>
                                <form onSubmit={handleAddHotel} className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="Hotel Name" className="border p-2 rounded" value={hotelForm.name} onChange={(e) => setHotelForm({ ...hotelForm, name: e.target.value })} required />
                                    <select className="border p-2 rounded" value={hotelForm.destinationId} onChange={(e) => setHotelForm({ ...hotelForm, destinationId: e.target.value })} required>
                                        <option value="">Select Destination</option>
                                        {destinations.map(d => <option key={d._id} value={d._id}>{d.name}</option>)}
                                    </select>
                                    <input type="number" placeholder="Price Per Night" className="border p-2 rounded" value={hotelForm.pricePerNight} onChange={(e) => setHotelForm({ ...hotelForm, pricePerNight: e.target.value })} required />
                                    <input type="number" placeholder="Number of Rooms" className="border p-2 rounded" value={hotelForm.rooms} onChange={(e) => setHotelForm({ ...hotelForm, rooms: e.target.value })} required />
                                    <input type="text" placeholder="Amenities (comma-separated)" className="border p-2 rounded col-span-2" value={hotelForm.amenities} onChange={(e) => setHotelForm({ ...hotelForm, amenities: e.target.value })} />
                                    <input type="text" placeholder="Image URLs (comma-separated)" className="border p-2 rounded col-span-2" value={hotelForm.images} onChange={(e) => setHotelForm({ ...hotelForm, images: e.target.value })} />
                                    <button type="submit" className="col-span-2 bg-green-600 text-white py-2 rounded hover:bg-green-700">Add Hotel</button>
                                </form>
                            </div>
                        )}

                        {/* Add Flight Form */}
                        {activeTab === 'flights' && (
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h2 className="text-xl font-bold mb-4">Add New Flight</h2>
                                <form onSubmit={handleAddFlight} className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="Airline Name" className="border p-2 rounded" value={flightForm.airline} onChange={(e) => setFlightForm({ ...flightForm, airline: e.target.value })} required />
                                    <select className="border p-2 rounded" value={flightForm.destinationId} onChange={(e) => setFlightForm({ ...flightForm, destinationId: e.target.value })} required>
                                        <option value="">Select Destination</option>
                                        {destinations.map(d => <option key={d._id} value={d._id}>{d.name}</option>)}
                                    </select>
                                    <input type="text" placeholder="Source City" className="border p-2 rounded" value={flightForm.sourceCity} onChange={(e) => setFlightForm({ ...flightForm, sourceCity: e.target.value })} required />
                                    <input type="number" placeholder="Price" className="border p-2 rounded" value={flightForm.price} onChange={(e) => setFlightForm({ ...flightForm, price: e.target.value })} required />
                                    <input type="number" placeholder="Number of Seats" className="border p-2 rounded" value={flightForm.seats} onChange={(e) => setFlightForm({ ...flightForm, seats: e.target.value })} required />
                                    <input type="text" placeholder="Duration (e.g., 2h 30m)" className="border p-2 rounded col-span-2" value={flightForm.duration} onChange={(e) => setFlightForm({ ...flightForm, duration: e.target.value })} required />
                                    <button type="submit" className="col-span-2 bg-purple-600 text-white py-2 rounded hover:bg-purple-700">Add Flight</button>
                                </form>
                            </div>
                        )}
                    </div>
                )}

                {/* MANAGE SECTION */}
                {activeSection === 'manage' && (
                    <div>
                        {/* Sub-tabs for Manage */}
                        <div className="flex space-x-4 mb-6 border-b">
                            <button
                                onClick={() => setActiveTab('destinations')}
                                className={`px-4 py-2 font-semibold ${activeTab === 'destinations' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-600'}`}
                            >
                                Destinations
                            </button>
                            <button
                                onClick={() => setActiveTab('bookings')}
                                className={`px-4 py-2 font-semibold ${activeTab === 'bookings' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-600'}`}
                            >
                                Bookings
                            </button>
                        </div>

                        {/* Manage Destinations */}
                        {activeTab === 'destinations' && (
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h2 className="text-xl font-bold mb-4">All Destinations ({destinations.length})</h2>
                                {loading ? (
                                    <p>Loading...</p>
                                ) : destinations.length === 0 ? (
                                    <p className="text-gray-500">No destinations found. Use the "Add" section to create one!</p>
                                ) : (
                                    <div className="space-y-3">
                                        {destinations.map(dest => (
                                            <div key={dest._id} className="flex justify-between items-center border-b pb-2">
                                                <div>
                                                    <p className="font-semibold">{dest.name}</p>
                                                    <p className="text-sm text-gray-600">{dest.city}, {dest.state} - ₹{dest.basePrice}</p>
                                                    <p className="text-xs text-gray-500">Hotels: {dest.hotels?.length || 0} | Flights: {dest.flights?.length || 0}</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleEditDestination(dest)}
                                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button onClick={() => handleDeleteDestination(dest._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Manage Bookings */}
                        {activeTab === 'bookings' && (
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h2 className="text-xl font-bold mb-4">All Bookings ({bookings.length})</h2>
                                {bookings.length === 0 ? (
                                    <p className="text-gray-500">No bookings yet.</p>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full border">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="border p-2 text-left">User</th>
                                                    <th className="border p-2 text-left">Destination</th>
                                                    <th className="border p-2 text-left">Hotel/Flight</th>
                                                    <th className="border p-2 text-left">Dates</th>
                                                    <th className="border p-2 text-left">Guests</th>
                                                    <th className="border p-2 text-left">Total Price</th>
                                                    <th className="border p-2 text-left">Status</th>
                                                    <th className="border p-2 text-left">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {bookings.map((booking) => (
                                                    <tr key={booking._id} className="hover:bg-gray-50">
                                                        <td className="border p-2">{booking.user?.name || 'Unknown'}</td>
                                                        <td className="border p-2">{booking.destination?.name || 'N/A'}</td>
                                                        <td className="border p-2">
                                                            {booking.hotel && <span>Hotel: {booking.hotel.name}</span>}
                                                            {booking.flight && <span>Flight: {booking.flight.airline}</span>}
                                                        </td>
                                                        <td className="border p-2">
                                                            {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                                                        </td>
                                                        <td className="border p-2">{booking.guests}</td>
                                                        <td className="border p-2">₹{booking.totalPrice}</td>
                                                        <td className="border p-2">
                                                            <span className={`px-2 py-1 rounded text-xs ${booking.status === 'CONFIRMED' ? 'bg-green-200 text-green-800' :
                                                                booking.status === 'COMPLETED' ? 'bg-blue-200 text-blue-800' :
                                                                    'bg-red-200 text-red-800'
                                                                }`}>
                                                                {booking.status}
                                                            </span>
                                                        </td>
                                                        <td className="border p-2">
                                                            <div className="flex gap-2">
                                                                {booking.status === 'CONFIRMED' && (
                                                                    <button
                                                                        onClick={() => handleCompleteBooking(booking._id)}
                                                                        className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600"
                                                                    >
                                                                        Complete
                                                                    </button>
                                                                )}
                                                                {booking.status === 'COMPLETED' && (
                                                                    <button
                                                                        onClick={() => handleDeleteBooking(booking._id)}
                                                                        className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
