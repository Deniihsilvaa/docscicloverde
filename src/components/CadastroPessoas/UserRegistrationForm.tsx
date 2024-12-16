import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { supabase } from "../../services/supabase";

interface FormData {
  fullName: string;
  email: string;
  password: string;
  role: string; // Novo campo para o tipo de usuário
}

const UserRegistrationForm = () => {
    const [formData, setFormData] = useState<FormData>({
      fullName: "",
      email: "",
      password: "",
      role: "COLLABORATOR",
    });
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<any[]>([]);
    const [editingUserId, setEditingUserId] = useState<string | null>(null);
    const toast = useRef<Toast>(null);
  
    const fetchUsers = async () => {
        const { data, error } = await supabase.from("viewbase_user").select("*");
        if (error) {
          console.error("Error fetching users:", error);
        } else {
          setUsers(data);
        }
      };
    const handleEdit = (user: any) => {
      setFormData({
        fullName: `${user.first_name} ${user.last_name}`,
        email: user.email,
        password: "", // Não exibir a senha por segurança
        role: user.role,
      });
      setEditingUserId(user.user_id);
    };
  
    // Salvar ou editar o usuário
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
      
        try {
          const { data: user, error } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
              data: {
                full_name: formData.fullName,
                role: formData.role, // Salvar o papel do usuário
              },
            },
          });
      
          if (error) throw error;
      
          if (user && user.user) {
            // Salvar na tabela base_user
            const { error: insertError } = await supabase.from("base_user").insert({
              user_id: user.user.id, // Usar o ID do usuário criado
              role: formData.role,
              first_name: formData.fullName.split(" ")[0],
              last_name: formData.fullName.split(" ")[1] || "", // Evitar erro se não houver sobrenome
              email: formData.email,
            });
      
            if (insertError) {
              // Verificar se o erro é relacionado a dados duplicados
              if (insertError.code === "23505") {
                toast.current?.show({
                  severity: "error",
                  summary: "Erro de Cadastro",
                  detail: "Este email já está cadastrado no sistema.",
                  life: 5000,
                });
              } else {
                // Outros erros
                toast.current?.show({
                  severity: "error",
                  summary: "Erro ao Salvar",
                  detail: "Não foi possível salvar os dados. Tente novamente.",
                  life: 5000,
                });
              }
              throw insertError;
            } else {
              // Mensagem de sucesso
              toast.current?.show({
                severity: "success",
                summary: "Sucesso",
                detail: "Usuário registrado com sucesso!",
                life: 5000,
              });
            }
          }
      
          // Resetar o formulário
          setFormData({
            fullName: "",
            email: "",
            password: "",
            role: "COLLABORATOR", // Valor padrão
          });
      
          fetchUsers(); // Atualizar a lista de usuários
        } catch (error: any) {
          console.error("Erro durante o registro:", error);
      
          toast.current?.show({
            severity: "error",
            summary: "Erro",
            detail: error.message || "Ocorreu um erro ao registrar o usuário.",
            life: 5000,
          });
        } finally {
          setLoading(false);
        }
      };
      
  

    const handleDelete = async (id: string) => {
        console.log('Recebendo id', id)
      const { error } = await supabase.from("base_user").delete().eq("id", id);
      if (error) {
        console.error("Error deleting user:", error);
        toast.current?.show({
            severity: "error",
            summary:"Error",
            detail: error.message,
            life: 5000,
        })
      } else {
        fetchUsers();
        toast.current?.show({
            severity: "success",
            summary:"Success",
            detail:"Usuario deletado com sucesso",
            life: 5000,
        })
      }
    }
    useEffect(() => {
      fetchUsers();
    }, []);
  
    return (
      <div className="flex items-center justify-center min-h-screen p-2 bg-gray-50">
        <Toast ref={toast} />
        <div className="grid w-full grid-cols-2 gap-4 p-4 bg-white shadow-2xl max-w-7xl rounded-xl">
          <div className="p-4 rounded-lg bg-slate-500">
            <h1 className="mb-4 text-3xl font-bold text-center text-gray-900">
              {editingUserId ? "Editar Usuario" : "Registrar Usuario"}
            </h1>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium">
                  Full Name
                </label>
                <InputText
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <InputText
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <Password
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  toggleMask
                  required={!editingUserId}
                />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-medium">
                  User Type
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  required
                >
                  <option value="COLLABORATOR">Colaborador</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full p-2 text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                {loading
                  ? "Processando..."
                  : editingUserId
                  ? "Salvar Alterações"
                  : "Registrar"}
              </Button>
            </form>
          </div>
  
          <div className="p-4 bg-gray-100 rounded-lg">
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              Usuarios Registrados
            </h2>
            <table className="w-full border border-gray-300">
              <thead>
                <tr>
                  <th className="p-2 border-b">Nome Completo</th>
                  <th className="p-2 border-b">Email</th>
                  <th className="p-2 border-b">Tipo</th>
                  <th className="p-2 border-b"></th>
                  <th className="p-2 border-b">Colaborador</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.user_id}>
                    <td className="p-2 border-b">
                      {user.first_name} {user.last_name}
                    </td>
                    <td className="p-2 border-b">{user.email}</td>
                    <td className="p-2 border-b">{user.role}</td>
                    <td className="p-2 border-b">
                      <Button
                        className="mr-2 bg-yellow-400 hover:bg-yellow-500"
                        icon="pi pi-pencil"
                        onClick={() => handleEdit(user)}
                      />
                      <Button
                        className="text-white bg-red-600 hover:bg-red-700"
                        icon="pi pi-trash"
                        onClick={() => handleDelete(user.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
  

export default UserRegistrationForm;
