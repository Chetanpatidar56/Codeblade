import React, { useState } from "react";
import axiosClient from "../client/axiosClient";


const AdminPanel = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    difficulty: "easy",
    tags: "array",
    visibletestcases: [{ input: "", output: "", explanation: "" }],
    hiddentestcases: [{ input: "", output: "" }],
    startcode: [{ language: "", initialcode: "" }],
    refrencesolution: [{ language: "", completecode: "" }],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (section, index, field, value) => {
    const updated = [...formData[section]];
    updated[index][field] = value;
    setFormData({ ...formData, [section]: updated });
  };

  const addField = (section, newObj) => {
    setFormData({ ...formData, [section]: [...formData[section], newObj] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.post("/problem/create", formData);
      alert("✅ Problem created successfully!");
      setFormData({
        title: "",
        description: "",
        difficulty: "easy",
        tags: "array",
        visibletestcases: [{ input: "", output: "", explanation: "" }],
        hiddentestcases: [{ input: "", output: "" }],
        startcode: [{ language: "", initialcode: "" }],
        refrencesolution: [{ language: "", completecode: "" }],
      });
    } catch (err) {
      console.error("Error creating problem:", err);
      alert("❌ Failed to create problem");
    }
  };

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-6 shadow-lg">
        <h1 className="text-3xl font-bold text-center">
          Admin Panel – Create Problem
        </h1>
       
      </header>

      {/* Form */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl p-8 space-y-8"
        >
          {/* Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="textarea textarea-bordered w-full"
              rows="4"
              required
            />
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Difficulty
            </label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="select select-bordered w-full"
              required
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Tag</label>
            <select
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="select select-bordered w-full"
              required
            >
              <option value="array">Array</option>
              <option value="linked list">Linked List</option>
              <option value="string">String</option>
              <option value="dynamic programming">Dynamic Programming</option>
              <option value="quene">Queue</option>
              <option value="stack">Stack</option>
              <option value="graph">Graph</option>
            </select>
          </div>

          {/* Visible Testcases */}
          <div>
            <h2 className="text-lg font-semibold text-purple-700 mb-3">
              Visible Testcases
            </h2>
            {formData.visibletestcases.map((tc, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 mb-3">
                <input
                  type="text"
                  placeholder="Input"
                  value={tc.input}
                  onChange={(e) =>
                    handleArrayChange("visibletestcases", index, "input", e.target.value)
                  }
                  className="input input-bordered"
                  required
                />
                <input
                  type="text"
                  placeholder="Output"
                  value={tc.output}
                  onChange={(e) =>
                    handleArrayChange("visibletestcases", index, "output", e.target.value)
                  }
                  className="input input-bordered"
                  required
                />
                <input
                  type="text"
                  placeholder="Explanation"
                  value={tc.explanation}
                  onChange={(e) =>
                    handleArrayChange("visibletestcases", index, "explanation", e.target.value)
                  }
                  className="input input-bordered"
                  required
                />
              </div>
            ))}
            <button
              type="button"
              className="btn"
              onClick={() =>
                addField("visibletestcases", { input: "", output: "", explanation: "" })
              }
            >
              + Add Visible Testcase
            </button>
          </div>

          {/* Hidden Testcases */}
          <div>
            <h2 className="text-lg font-semibold text-purple-700 mb-3">
              Hidden Testcases
            </h2>
            {formData.hiddentestcases.map((tc, index) => (
              <div key={index} className="grid grid-cols-2 gap-4 mb-3">
                <input
                  type="text"
                  placeholder="Input"
                  value={tc.input}
                  onChange={(e) =>
                    handleArrayChange("hiddentestcases", index, "input", e.target.value)
                  }
                  className="input input-bordered"
                  required
                />
                <input
                  type="text"
                  placeholder="Output"
                  value={tc.output}
                  onChange={(e) =>
                    handleArrayChange("hiddentestcases", index, "output", e.target.value)
                  }
                  className="input input-bordered"
                  required
                />
              </div>
            ))}
            <button
              type="button"
              className="btn"
              onClick={() => addField("hiddentestcases", { input: "", output: "" })}
            >
              + Add Hidden Testcase
            </button>
          </div>

          {/* Starter Code */}
          <div>
            <h2 className="text-lg font-semibold text-purple-700 mb-3">
              Starter Code
            </h2>
            {formData.startcode.map((code, index) => (
              <div key={index} className="grid grid-cols-2 gap-4 mb-3">
                <input
                  type="text"
                  placeholder="Language"
                  value={code.language}
                  onChange={(e) =>
                    handleArrayChange("startcode", index, "language", e.target.value)
                  }
                  className="input input-bordered"
                  required
                />
                <textarea
                  placeholder="Initial Code"
                  value={code.initialcode}
                  onChange={(e) =>
                    handleArrayChange("startcode", index, "initialcode", e.target.value)
                  }
                  className="textarea textarea-bordered"
                  required
                />
              </div>
            ))}
            <button
              type="button"
              className="btn"
              onClick={() => addField("startcode", { language: "", initialcode: "" })}
            >
              + Add Starter Code
            </button>
          </div>

          {/* Reference Solution */}
          <div>
            <h2 className="text-lg font-semibold text-purple-700 mb-3">
              Reference Solution
            </h2>
            {formData.refrencesolution.map((sol, index) => (
              <div key={index} className="grid grid-cols-2 gap-4 mb-3">
                <input
                  type="text"
                  placeholder="Language"
                  value={sol.language}
                  onChange={(e) =>
                    handleArrayChange("refrencesolution", index, "language", e.target.value)
                  }
                  className="input input-bordered"
                  required
                />
                <textarea
                  placeholder="Complete Code"
                  value={sol.completecode}
                  onChange={(e) =>
                    handleArrayChange("refrencesolution", index, "completecode", e.target.value)
                  }
                  className="textarea textarea-bordered"
                  required
                />
              </div>
            ))}
            <button
              type="button"
              className="btn"
              onClick={() => addField("refrencesolution", { language: "", completecode: "" })}
            >
              + Add Reference Solution
            </button>
          </div>

          {/* Submit */}
          <div className="pt-6">
            <button
              type="submit"
              className="btn bg-purple-600 hover:bg-purple-700 text-white font-semibold w-full"
            >
              Create Problem
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPanel;
