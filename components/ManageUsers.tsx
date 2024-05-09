import React from "react";

const ManageUsers = () => {
  return (
    <div className="w-full">
      <p className="text-3xl">Manage Users</p>
      <br />
      <div className="flex justify-between p-10 rounded-xl bg-red-200 items-center">
        <div className="text-xl font-semibold">
          Username
          {/* render this dynamically */}
        </div>
        <div className="flex justify-between gap-2">
          <button className="bg-primary p-2 rounded-lg">Change Username</button>
          <button className="bg-primary p-2 rounded-lg">Delete User</button>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
