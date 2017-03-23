<%-- Следующие 4 строки представляют собой директивы ASP.NET, необходимые при использовании компонентов SharePoint --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- Разметка и скрипт из следующего элемента Content будут помещены в элемент <head> страницы --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-3.1.1.min.js"></script>
    <SharePoint:ScriptLink name="sp.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />
    <meta name="WebPartPageExpansion" content="full" />

    <!-- Добавьте свои стили CSS в следующий файл -->
    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />
    <!-- Добавьте свой код JavaScript в следующий файл -->
    
    <script src="../Scripts/angular.js"></script>
    <script src="../App/Controller.js"></script>
</asp:Content>

<%-- Разметка из следующего элемента Content будет помещена в элемент TitleArea страницы --%>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
   Форма для создания запросов на доступ к системе
</asp:Content>

<%-- Разметка и скрипт из следующего элемента Content будут помещены в элемент <body> страницы --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
<br/>  
<div  ng-app="RequestForm">  
    <div ng-controller="TasksController as ctrl">  
        <br/>
        <strong>Выберите систему:</strong>  
        <br/>
        <p>
        <select
        ng-model="selectedSystemsItem"
        ng-options="p.Title for p in Systems">
        </select>
        </p>
        <br/>
        <strong>Выберите роль: </strong>
        <br/>
         <p>
        <select
        ng-model="selectedRolesItem"
        ng-disabled="!selectedSystemsItem.Title"
        ng-options="c.Title for c in Roles | filter:{Title : selectedSystemsItem.Title}">
        </select>
        </p>
        <input type="submit" value="Отправить запрос на согласование" ng-click="setListItems($event)" />
        </div>  
  </div>
</asp:Content>
