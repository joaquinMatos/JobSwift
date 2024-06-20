﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Domain.DTO
{
    public class JwTResponse
    {
        public string Key {  get; set; }
        public string Issuer {  get; set; }
        public string Audience { get; set; }
        public string Subject { get; set; }
    }
}