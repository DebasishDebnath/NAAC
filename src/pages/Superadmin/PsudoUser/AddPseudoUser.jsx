import React, { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import { useAddPseudoUser } from "../../../Apis/Superadmin/PsudoUser/AddPseudoUser.jsx";
function AddPseudoUser({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    college: "IEMN",
  });

  const { addPseudoUserSuperadmin } = useAddPseudoUser();

  const collegeMap = {
    IEMN: "IEM Newtown",
    IEMS: "IEM Saltlake",
    UEMJ: "UEM Jaipur",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const validDomains = ["@iem.edu.in", "@uem.edu.in"];
    // const emailValid = validDomains.some((domain) =>
    //   formData.email.endsWith(domain)
    // );

    // if (!emailValid) {
    //   alert("Email must end with @iem.edu.in or @uem.edu.in");
    //   return;
    // }

    const payload = {
      name: formData.name,
      email: formData.email,
      contact: formData.contact,
      campus: collegeMap[formData.college],
    };

    const result = await addPseudoUserSuperadmin(payload);
    if (result) {
      onClose();
    }
  };

  return (
    <Dialog open={true} onClose={onClose} className="relative z-50">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-[40%] rounded-2xl bg-white p-8 shadow-2xl space-y-6">
          <h2 className="text-2xl font-bold text-[#002946]">Add Pseudo User</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">
                Email ID <span className="text-red-500">*</span>{" "}
                {/* <span className="text-xs text-gray-500 ml-1">
                  (Only @iem.edu.in / @uem.edu.in)
                </span> */}
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
               
                className="mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
              />
              <div className="text-[10px] text-red-500">
                The pseudo user will receive a temporary password by this email.
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">
                Contact Number <span className="text-red-500">*</span>
              </label>
              <input
                name="contact"
                type="tel"
                value={formData.contact}
                onChange={handleChange}
                required
                className="mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">
                College <span className="text-red-500">*</span>
              </label>
              <select
                name="college"
                value={formData.college}
                onChange={handleChange}
                className="mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
              >
                <option value="IEMN">IEM Newtown</option>
                <option value="IEMS">IEM Saltlake</option>
                <option value="UEMJ">UEM Jaipur</option>
              </select>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button
                variant="outline"
                type="button"
                onClick={onClose}
                className="rounded-xl px-4"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="rounded-xl bg-[#002946] hover:bg-[#22343bc9] text-white px-5"
              >
                Add User
              </Button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default AddPseudoUser;
