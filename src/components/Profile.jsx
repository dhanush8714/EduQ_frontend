import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import API_BASE_URL from "../utils/api";

export default function Profile() {
  const { user, loading, refreshUser } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [image, setImage] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  // ⏳ Wait until auth is restored
  if (loading) {
    return (
      <div className="mt-24 text-center text-gray-500">
        Loading profile...
      </div>
    );
  }

  // 🔐 Redirect only AFTER loading
  if (!user) {
    return <Navigate to="/login" />;
  }

  // 🖼 Profile image (safe)
  const profileImage = user.profileImage
    ? `${API_BASE_URL}${user.profileImage}`
    : "https://i.pravatar.cc/150";

  // 🔄 Update name & email
  async function handleUpdateProfile(e) {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/users/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      localStorage.setItem("userInfo", JSON.stringify(data));
      refreshUser();
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  }

  // 🖼 Upload profile image
  async function handleUploadImage(e) {
    e.preventDefault();
    if (!image) return;

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", image);

      const res = await fetch(
        `${API_BASE_URL}/api/users/profile-image`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          body: formData,
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      localStorage.setItem(
        "userInfo",
        JSON.stringify({ ...user, profileImage: data.profileImage })
      );
      refreshUser();
      setImage(null);
    } catch (err) {
      alert(err.message);
    } finally {
      setUploading(false);
    }
  }

  // ❌ Delete profile image
  async function handleDeleteImage() {
    try {
      await fetch(`${API_BASE_URL}/api/users/profile-image`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      localStorage.setItem(
        "userInfo",
        JSON.stringify({ ...user, profileImage: "" })
      );
      refreshUser();
    } catch (err) {
      alert("Failed to delete image");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-24 bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4 text-center">
        Edit Profile
      </h2>

      {/* Profile Image */}
      <div className="flex flex-col items-center mb-5">
        <img
          src={profileImage}
          alt="profile"
          className="w-28 h-28 rounded-full object-cover border"
        />

        {user.profileImage && (
          <button
            onClick={handleDeleteImage}
            className="mt-2 text-sm text-red-500 flex items-center gap-1 cursor-pointer"
          >
            <FaTrash />
            Remove Image
          </button>
        )}
      </div>

      {/* Image Upload */}
      <form onSubmit={handleUploadImage} className="mb-5">
        <label
          htmlFor="profileImage"
          className="flex items-center justify-center gap-2 w-full px-4 py-2 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition"
        >
          <FiUpload className="text-xl text-blue-600" />
          <span className="text-sm font-medium text-gray-700">
            Choose Profile Image
          </span>
        </label>

        <input
          id="profileImage"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button
          type="submit"
          disabled={uploading}
          className="w-full mt-3 bg-green-600 text-white py-2 rounded hover:bg-green-700 cursor-pointer disabled:opacity-60"
        >
          {uploading ? "Uploading..." : "Upload Image"}
        </button>
      </form>

      {/* Name & Email */}
      <form onSubmit={handleUpdateProfile}>
        <input
          className="w-full mb-3 p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />

        <input
          className="w-full mb-4 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <button
          disabled={saving}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 cursor-pointer disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
