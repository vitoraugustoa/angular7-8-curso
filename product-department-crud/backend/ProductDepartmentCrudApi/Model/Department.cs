using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ProductDepartmentCrudApi.Model
{
    public partial class Department
    {
        public Department()
        {
            this.ProductDepartment = new HashSet<ProductDepartment>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        [JsonIgnore]
        public virtual ICollection<ProductDepartment> ProductDepartment { get; set; }
    }
}
