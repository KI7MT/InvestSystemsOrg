"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var router_1 = require('@angular/router');
var companies_service_1 = require('./companies.service');
var CompanyDetailComponent = (function () {
    function CompanyDetailComponent(companiesService, route, titleService) {
        this.companiesService = companiesService;
        this.route = route;
        this.titleService = titleService;
    }
    CompanyDetailComponent.prototype.ngOnInit = function () {
        //let symbol = this.route.snapshot.params['symbol'];
        var _this = this;
        this.routeParams = this.route.params.subscribe(function (params) {
            var symbol = params['symbol'];
            _this.company = _this.companiesService.getCompany(symbol);
        });
    };
    CompanyDetailComponent.prototype.ngOnDestroy = function () {
        this.routeParams.unsubscribe();
    };
    CompanyDetailComponent.prototype.save = function (newName) {
        this.company.set({ name: newName });
    };
    CompanyDetailComponent.prototype.update = function (newSize) {
        this.company.update({ size: newSize });
    };
    CompanyDetailComponent.prototype.delete = function () {
        this.company.remove();
    };
    CompanyDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'company-detail',
            templateUrl: 'company-detail.component.html',
            styleUrls: ['company-detail.component.css']
        }), 
        __metadata('design:paramtypes', [companies_service_1.CompaniesService, router_1.ActivatedRoute, platform_browser_1.Title])
    ], CompanyDetailComponent);
    return CompanyDetailComponent;
}());
exports.CompanyDetailComponent = CompanyDetailComponent;
//# sourceMappingURL=company-detail.component.js.map