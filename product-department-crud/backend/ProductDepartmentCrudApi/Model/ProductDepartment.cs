using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ProductDepartmentCrudApi.Model
{
    public partial class ProductDepartment
    {
        [JsonIgnore]
        public int ProductId { get; set; }
        [JsonIgnore]
        public int DepartmentId { get; set; }

        public virtual Department Department { get; set; }
        [JsonIgnore]
        public virtual Product Product { get; set; }
    }
}
