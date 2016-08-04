﻿using InvSys.Companies.Tests.Integration.Proxy;
using Microsoft.Extensions.Configuration;
using System;
using System.Linq;
using Xunit;

namespace InvSys.Companies.Tests.Integration.Api.Controllers
{
    public class CompaniesController
    {
        ICompaniesAPI client;
        IConfigurationRoot _configuration;


        public CompaniesController()
        {
            var builder = new ConfigurationBuilder()
                .AddJsonFile("testsettings.json", optional: true, reloadOnChange: true)
                .AddEnvironmentVariables();
            _configuration = builder.Build();
            client = new CompaniesAPI(new Uri(_configuration["Client:Url"], UriKind.Absolute));
        }

        [Fact]
        public async void CanGetAllCompanies()
        {
            // Given
            var newCompany = new CompanyBuilder().Build();
            await client.CreateCompanyAsync(newCompany);

            // When
            var companies = await client.GetCompaniesAsync();

            // Then
            Assert.NotNull(companies);
            Assert.NotNull(companies.Any());
        }

        [Fact]
        public async void CanGetCompanyById()
        {
            // Given
            var newCompany = new CompanyBuilder().Build();
            await client.CreateCompanyAsync(newCompany);

            // When
            var company = await client.GetCompanyAsync(newCompany.Id.Value);

            // Then
            Assert.NotNull(company);
            Assert.Equal(newCompany.Id.Value, company.Id);
        }

        [Fact]
        public async void CanCreateCompany()
        {
            // When
            var newCompany = new CompanyBuilder().Build();
            var company = await client.CreateCompanyAsync(newCompany);

            // Then
            Assert.NotNull(company);
            Assert.Equal(newCompany.Id.Value, company.Id);
        }

        [Fact]
        public async void CanUpdateCompany()
        {
            // Given
            var newCompany = new CompanyBuilder().Build();
            var companyToUpdate = await client.CreateCompanyAsync(newCompany);

            // When
            companyToUpdate.Description += " [updated]";
            var company = await client.UpdateCompanyAsync(companyToUpdate.Id.Value, companyToUpdate);

            // Then
            Assert.NotNull(company);
            Assert.Equal(companyToUpdate.Id, company.Id);
            Assert.Equal(companyToUpdate.Description, company.Description);
        }

        [Fact]
        public async void CanDeleteCompany()
        {
            // Given
            var newCompany = new CompanyBuilder().Build();
            var companyToDelete = await client.CreateCompanyAsync(newCompany);

            // When            
            await client.DeleteCompanyAsync(companyToDelete.Id.Value);

            // Then
            var company = await client.GetCompanyAsync(newCompany.Id.Value);
            Assert.Null(company);
        }
    }
}
