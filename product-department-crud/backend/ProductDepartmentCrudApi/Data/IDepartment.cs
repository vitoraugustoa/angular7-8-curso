using ProductDepartmentCrudApi.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductDepartmentCrudApi.Data
{
    public interface IDepartmentData
    {
        public List<Department> GetAll();

        public Department GetById(int id);

        public Department Add(Department department);

        public Department Remove(int id);

        public Department Update(Department department);
    }
}
