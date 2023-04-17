type CountryData = {
    name: string;
    intelligence: string;
    borderSecurity: string;
    counterTerrorism: string;
    cyberSecurity: string;
    emergencyManagement: string;
    criticalInfrastructure: string;
    publicHealthSecurity: string;
  };
  
type Data = {
    countryData?: CountryData;
    error?: string;
  };
