using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace WebApiA.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ServiceAController : ControllerBase
    {
        private readonly ILogger<ServiceAController> _logger;

        public ServiceAController(ILogger<ServiceAController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public Feature Get()
        {
            return new Feature
            {
                Color = "Pink",
                Description = "Feature A : Third Version of this feature",
                Name = "Feature A",
                Version = "V3.0"

            };
        }
    }
}
