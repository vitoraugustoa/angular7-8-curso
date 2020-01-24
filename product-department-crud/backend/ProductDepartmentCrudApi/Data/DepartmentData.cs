using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProductDepartmentCrudApi.Model;

namespace ProductDepartmentCrudApi.Data
{
    public class DepartmentData : IDepartmentData
    {
        private readonly ProductDbContext _productContext;

        public DepartmentData(ProductDbContext productContext)
        {
            _productContext = productContext;
        }

        public Department Add(Department department)
        {
            try
            {
                _productContext.Department.Add(department);
                _productContext.SaveChanges();
                return department;
            }
            catch(Exception ex)
            {
                if (ex.InnerException != null)
                    throw ex.InnerException;
                else
                    throw ex;
            }   
        }

        public List<Department> GetAll()
        {
            try
            {
                List<Department> departments = _productContext.Department.ToList();
                return departments;
            }
            catch (Exception ex)
            {
                if (ex.InnerException != null)
                    throw ex.InnerException;
                else
                    throw ex;
            }
        }

        public Department GetById(int id)
        {
            try
            {
                Department department = _productContext.Department.Find(id);
                return department;
            }
            catch (Exception ex)
            {
                if (ex.InnerException != null)
                    throw ex.InnerException;
                else
                    throw ex;
            }
        }

        public Department Remove(int id)
        {
            try
            {
                Department department = _productContext.Department.Find(id);
                if (department == null)
                    throw new Exception("Departamento não encontrado.");

                _productContext.Department.Remove(department);
                return department;
            }
            catch (Exception ex)
            {
                if (ex.InnerException != null)
                    throw ex.InnerException;
                else
                    throw ex;
            }
        }

        public Department Update(Department department)
        {
            try
            {
                Department departmentToUpdate = _productContext.Department.Find(department.Id);
                if (departmentToUpdate == null)
                    throw new Exception("Departamento não foi encontrado.");

                _productContext.Department.Update(departmentToUpdate);
                _productContext.SaveChanges();
                return departmentToUpdate;
            }
            catch (Exception ex)
            {
                if (ex.InnerException != null)
                    throw ex.InnerException;
                else
                    throw ex;
            }
        }
    }
}
