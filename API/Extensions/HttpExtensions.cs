using API.Helpers;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace API.Extensions
{
    public static class HttpExtensions
    {
        public static void AddPaginationHeader(this HttpResponse httpResponse, int currentPage,
            int itemsPerpage, int totalItems, int totalPages)
        {
            var paginationHeader = new PaginationHeader(currentPage, itemsPerpage, totalItems, totalPages);

            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };

            httpResponse.Headers.Add("Pagination",JsonSerializer.Serialize(paginationHeader, options));
            httpResponse.Headers.Add("Access-Control-Expose-Headers", "Pagination"); //to expose Pagination
        }

    }
}
