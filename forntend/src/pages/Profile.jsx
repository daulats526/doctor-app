import React, { useContext, useState } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, setUser, backendUrl, token, userData } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);

  const updateProfile = async () => {
    try {
      const formData = new FormData();
      if (image) formData.append("image", image);
      formData.append("name", user.name);
      formData.append("email", user.email);
      formData.append("address", user.address);
      formData.append("phone", user.phone);
      formData.append("gender", user.gender);

      const { data } = await axios.put(`${backendUrl}/api/user/update`, formData, {
        headers: { token },
      });

      if (data.success) {
        toast.success(data?.message);
        await userData(); // Refresh user data
        setIsEdit(false);
        setImage(null);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.message);
    }
  };

  const handleInputChange = (key, value) => {
    setUser((prev) => ({ ...prev, [key]: value }));
  };

  return (
    user && (
      <div className="max-w-lg flex flex-col gap-2 text-sm">
        {isEdit ? (
          <label htmlFor="image">
            <div className="inline-block relative cursor-pointer">
              <img
                className="w-36 rounded opacity-75"
                src={image ? URL.createObjectURL(image) : user?.image}
                alt="Profile"
              />
              {!image && (
                <img
                  className="w-10 absolute bottom-12 right-12"
                  src={assets.upload_icon}
                  alt="Upload Icon"
                />
              )}
            </div>
            <input
              type="file"
              id="image"
              hidden
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
        ) : (
          <img className="w-36 rounded border" src={user?.image} alt="Profile" />
        )}

        {isEdit ? (
          <input
            className="bg-gray-100 text-3xl font-medium max-w-60 mt-4"
            value={user?.name || ""}
            type="text"
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        ) : (
          <p className="font-medium text-3xl text-neutral-900 mt-4">{user?.name}</p>
        )}
        <hr className="bg-zinc-500 h-[1px] border-none" />

        <div>
          <p className="text-neutral-600 underline mt-3">CONTACT INFORMATION</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-800">
            <p className="font-medium">Phone:</p>
            {isEdit ? (
              <input
                className="bg-gray-100"
                value={user?.phone || ""}
                type="text"
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            ) : (
              <span>{user?.phone}</span>
            )}

            <p className="font-medium">Address:</p>
            {isEdit ? (
              <input
                className="bg-gray-100"
                value={user?.address || ""}
                type="text"
                onChange={(e) => handleInputChange("address", e.target.value)}
              />
            ) : (
              <span>{user?.address}</span>
            )}

            <p className="font-medium">Email:</p>
            {isEdit ? (
              <input
                className="bg-gray-100"
                value={user?.email || ""}
                type="text"
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            ) : (
              <span>{user?.email}</span>
            )}
          </div>

          <div>
            <p className="text-neutral-600 underline mt-3">BASIC INFORMATION</p>
            <p>
              Gender:{" "}
              {isEdit ? (
                <input
                  className="bg-gray-100"
                  value={user?.gender || ""}
                  type="text"
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                />
              ) : (
                user?.gender
              )}
            </p>
            <p>
              Date of Birth:{" "}
              {isEdit ? (
                <input
                  className="bg-gray-100"
                  value={user?.dob || ""}
                  type="date"
                  onChange={(e) => handleInputChange("dob", e.target.value)}
                />
              ) : (
                user?.dob
              )}
            </p>
          </div>
        </div>

        <div className="mt-4">
          {isEdit ? (
            <button
              className="border border-primary px-8 py-2 rounded-lg hover:bg-primary hover:text-white transition-all duration-300"
              onClick={updateProfile}
            >
              Save
            </button>
          ) : (
            <button
              className="border border-primary px-8 py-2 rounded-lg hover:bg-primary hover:text-white transition-all duration-300"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default Profile;
