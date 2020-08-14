const zipcodes = require("zipcodes");
const data = require("./data.json");
const Lead = require("./models/Lead");

const seed = () => {
  data.forEach(async (each) => {
    const { lead } = each;

    try {
      const location = zipcodes.lookup(lead.zipcode);

      const newData = {
        businessName: lead.businessName,
        phoneNumber: lead.primaryPhoneNumber,
        city: location.city || "N/A",
        state: location.state || "N/A",
        email: lead.primaryemail || "N/A",
        category: "N/A",
        disposition: "Prospect",
      };

      let res = await Lead.findOne({
        primaryPhoneNumber: lead.primaryPhoneNumber,
      });

      if (res) {
        console.log(`This lead exists and it's called ${lead.businessName}`);
      } else {
        Lead.create(newData);
        console.log(
          `This lead does NOT exist and I ${lead.businessName} to the database`
        );
      }
    } catch (e) {
      console.log(e);
      console.log(`error saving ${lead.businessName}`);
    }
  });
};

module.exports = seed;
