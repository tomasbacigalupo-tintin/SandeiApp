const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function createFormation(data: { name: string; description?: string }) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/formations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error creating formation");
  return res.json();
}

export async function getFormations() {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/formations`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Error fetching formations");
  return res.json();
}
