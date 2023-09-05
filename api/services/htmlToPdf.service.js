const pdf = require('html-pdf-node');
const fs = require('fs');
const path = require('path');

const createPdf = async (data) => {
  const { projectDetails, projectHpsAreaData } = data
  const { projectName, projectAddress, managerName, managerPhone } = projectDetails
  const ontarioCityImagePath = fs.readFileSync(path.join(__dirname, '../assets/ontario-city.png'), { encoding: 'base64' });
  const ontarioFireDepartmentImagePath = fs.readFileSync(path.join(__dirname, '../assets/ontario-fire-department.png'), { encoding: 'base64' })
  const ontarioCityImageData = `data:image/jpeg;base64,${ontarioCityImagePath}`
  const ontarioFireDepartmentImageData = `data:image/jpeg;base64,${ontarioFireDepartmentImagePath}`
  const date = new Date().toJSON().slice(0, 10);
  const content = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Document</title>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link
              href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap"
              rel="stylesheet"
            />
            <style>
              * {
                box-sizing: border-box;
                padding: 0;
                margin: 0;
              }
              @page {
                size: auto;
                margin: 1mm;
                size: A4;
              }
        
              body {
                font-family: "Montserrat", sans-serif;
                background-color: #525659;
                width: 21cm;
                height: 29.7cm;
                margin: 0 auto;
                width: 1000px;
                height: 793px;
              }
              .container {
                margin: 0 auto;
                text-align: center;
                background: #fff;
                padding-inline: 15px;
                padding-bottom: 30px;
              }
              input:focus {
                outline: none;
                border: none;
              }
              p,
              li {
                font-size: 13px;
                line-height: 18px;
              }
              .logo-block {
                display: flex;
                align-items: start;
                justify-content: space-between;
                padding-top: 20px;
              }
              .logo-block img {
                width: 130px;
              }
              h1 {
                font-size: 20px;
                padding-bottom: 20px;
                padding-top: 50px;
              }
              h1 span {
                font-size: 16px;
                line-height: 15px;
              }
              h1 span:last-child {
                font-size: 17px;
              }
              .subheading {
                font-size: 18px;
                font-weight: 500;
              }
              .title {
                font-size: 30px;
                padding-top: 10px;
                padding-bottom: 20px;
                font-weight: 600;
              }
              h2 {
                font-size: 16px;
                font-weight: bold;
              }
              .project-details {
                width: 80%;
                margin: 0 auto;
                text-align: left;
              }
              .project-details p {
                display: flex;
                font-weight: 500;
                margin-bottom: 8px;
              }
              .project-details p span {
                font-size: 14px;
                font-weight: 500;
                width: 100%;
                max-width: max-content;
              }
              .project-details p span.ml-2 {
                margin-left: 10px;
              }
              .project-details input {
                border: none;
                border-bottom: 1px solid #000;
                width: 80%;
                margin-left: 10px;
              }
              .table-container {
                text-align: center;
              }
              .table-container table {
                border-collapse: collapse;
              }
              .table-container h2 {
                font-size: 20px;
                font-weight: 600;
                padding-top: 15px;
                display: inline-block;
                border-bottom: 1px solid #000;
                margin-bottom: 10px;
              }
        
              .table-container thead th {
                border: 2px solid #333;
              }
              .table-container thead th {
                padding: 3px;
                padding-bottom: 15px;
                font-weight: 500;
              }
              .table-container thead th,
              .table-container tbody td {
                font-size: 11px;
              }
              .table-container tbody td {
                border: 1px solid #000;
              }
              .table-container tbody tr td:first-child {
                border-left: 2px solid #000;
              }
              .table-container tbody tr td:last-child {
                border-right: 2px solid #000;
              }
              .table-container tbody tr:last-child td {
                border-bottom: 2px solid #333;
              }
              .hps-total {
                padding-left: 5px;
              }
              .hps-total input::placeholder {
                font-weight: 600;
                color: #000;
              }
              .table-container input {
                width: 100%;
                height: 100%;
                outline: none;
                border: none;
              }
              table {
                margin-block: 10px;
              }
              .table-container p {
                margin: 0 auto;
                font-size: 15px;
              }
              .table-container p.mb-0 {
                margin-bottom: 0px;
              }
        
              .table-container p input {
                height: auto;
              }
              .table-container .details {
                margin-top: 4px;
              }
              .table-container .details p {
                margin-bottom: 5px;
              }
              .table-container p input {
                width: auto;
                border: none;
                border-bottom: 1px solid #000;
                outline: none;
              }
        
              .text-right {
                text-align: right;
              }
              .building-information h2 {
                font-size: 20px;
                display: inline-block;
                border-bottom: 1px solid #000;
                margin-bottom: 10px;
                padding-top: 15px;
              }
              .building-information p {
                font-size: 15px;
                padding-bottom: 10px;
              }
              .building-information ul {
                padding-left: 20px;
              }
              .building-information ul li {
                text-align: left;
                font-size: 18px;
                font-weight: 500;
                margin-bottom: 5px;
                line-height: 24px;
              }
              .building-information input {
                border: none;
                border-bottom: 1px solid #000;
                outline: none;
                margin-left: 10px;
                width: 70px;
              }
              .building-information input[type="checkbox"] {
                width: auto;
                margin-right: 3px;
              }
              .color-light {
                color: #3d3b3b;
              }
              td.pr-5 {
                font-size: 16px !important;
                padding-right: 25px;
              }
              .building-information .declaration-text {
                text-align: left;
                margin-top: 20px;
                margin-bottom: 10px;
                font-size: 13px;
                font-weight: 500;
              }
              .building-information .signature-text {
                text-align: left;
              }
              .signature-text .signature-input {
                width: 35%;
                margin-right: 10px;
              }
              .signature-text .date-input {
                width: 20%;
              }
              .signature-name {
                padding-left: 90px;
                font-size: 13px !important;
                font-weight: 600;
                text-align: left;
              }
              .page-break {
                page-break-after: always;
              }
              .sprinkler-info{
                padding-top:50px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="logo-block">
                <img src="${ontarioCityImageData}" alt="" />
                <h1>
                  ONTARIO FIRE DEPARTMENT <br />
                  <span> 415 East “B” Street, Ontario, CA 91764-4107</span> <br />
                  <span> Phone (909) 395-2029 – Fax (909) 395-2585</span>
                </h1>
                <img src="${ontarioFireDepartmentImageData}" alt="" />
              </div>
              <p class="subheading">RACK/HIGH-PILED COMBUSTIBLE STORAGE INFORMATION</p>
        
              <p class="title">WORKSHEET</p>
        
              <div class="project-details">
                <p><span>PROJECT/BUSINESS NAME</span> <input type="text" value ="${projectName}" /> </p>
                <p><span>PROJECT ADDRESS</span> <input type="text" value = "${projectAddress}"/> </p>
                <p>
                  <span>MANAGER/CONTACT PERSON</span> <input type="text" value = "${managerName}"/>
                  <span class="ml-2">PHONE</span>
                  <input type="text" value = "${managerPhone}"/>
                </p>
        
                <p><span>FIRE DEPT. PLAN CHECK NO.</span> <input type="text" /></p>
              </div>

              ${projectHpsAreaData.map(item => `

              <div class="table-container">
              <div style="padding-top: 50px; max-width: 400px; margin: 0 auto">
              <p style="display: flex; width: 100%">
                <span style="width: 100%; max-width: max-content">HPS Name :</span>
                <input style="width: 100%" type="text"  value = "${item.hpsAreaName || ""}"/>
              </p>
              <p style="display: flex; width: 100%">
                <span style="width: 100%; max-width: max-content"
                  >Sprinkler Name :</span
                >
                <input style="width: 100%" type="text" value ="${item.sprinklerName || ""}" />
              </p>
            </div>
                <h2>COMMODITY INFORMATION</h2>
                <p class="mb-0">
                  List all stock to be stored six (6) feet in height or over for high
                  hazard commodities and (12) feet and over for all other commodities.
                </p>
                <p>(Measure to the top of storage)</p>
                <table border-collapse="collapse">
                  <thead>
                    <tr>
                      <th width="300px">Materials</th>
                      <th>Type of shelving. Open, Wire Mesh, or Solid (>20sqft</th>
                      <th>
                        Commodity Classification Class I, II, III, IV or high hazard
                        (group A, B, or C plastics)
                      </th>
                      <th>Proposed Maximum Height (Feet & Inches)</th>
                      <th>Cartons, or Bags, or Exposed</th>
                      <th>Encapsulated 5 sides (Yes/No)</th>
                      <th>Palletized/ Solid Pile Racks or Shelves</th>
                      <th>If palletized, Wood or Plastic Pallets, or None</th>
                      <th>Percentage of Overall Storage</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                    </tr>
                    <tr>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                    </tr>
                    <tr>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                    </tr>
                    <tr>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                    </tr>
                    <tr>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                    </tr>
                    <tr>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                    </tr>
                    <tr>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                    </tr>
                    <tr>
                      <td colspan="8" class="pr-5" align="right">
                        <strong>Total</strong>
                      </td>
                      <td class="hps-total">
                        <input type="text" placeholder="100%" />
                      </td>
                    </tr>
                  </tbody>
                </table>
        
                <div class="details">
                  <p>
                    Total floor area to be used for high-piled / rack storage
                    <input type="text" value="${item.floorAreaOnThisFloor || ""}"/> sq. ft. <strong>for this permit</strong>
                  </p>
                  <p>
                    Total floor area to be used for high-piled / rack storage
                    <input type="text" value="${item.floorAreaOnEntireBuilding || ""}"/> sq. ft. in <strong>entire building</strong>
                  </p>
                  <p>Note: The floor area shall include the required aisles.</p>
                </div>
              </div>
        
              <div class="building-information">
                <h2>BUILDING INFORMATION</h2>
                <p>
                  Indicate the building and fire protection features provided in the
                  structure to store the commodities as indicated above.
                </p>
                <ul>
                  <li>
                    Roof Height: Minimum <input type="text" value = "${item.lowCielingFeet || ""}"/> feet -
                    <input type="text" value = "${item.lowCielingInch || ""}"/> inches Maximum <input type="text" value = "${item.highCielingFeet || ""}"/> feet -
                    <input type="text" value = "${item.highCielingInch || ""}"/>/> inches
                  </li>
                  <li>
                    Roof Pitch is Greater than 2in./12in. <input type="checkbox" ${item.isRoofPitchGreater ? 'checked' : ''}/> Yes
                    <input type="checkbox" ${item.isRoofPitchGreater ? '' : 'checked'}/>No
                  </li>
                  <li>
                    Commodity Clearance Between Top of Storage and the Sprinkler
                    Deflector for Each Storage Arrangement: Minimum
                    <input type="text" /> feet - inches Maximum
                    <input type="text" /> feet - <input type="text" /> inches
                  </li>
                  <li>
                    Control Mode Density / Area <input type="text" /> /
                    <input type="text" /> Head Temp: <input type="text" /> 0F. Aisle
                    Width<input type="text" /> in. <br />
                    “K” factor<input type="text" />
                  </li>
                  <li>
                    ESFR / CMSA “K” <input type="text" /> at
                    <input type="text" name="" id="" /> psi for
                    <input type="text" /> heads.
                  </li>
                  <li>
                    In-Rack Sprinklers <input type="text" /> Level(s) at
                    <input type="text" /> psi / gpm for <input type="text" /> Heads per
                    Figure <input type="text" />
                  </li>
                  <li>
                    Smoke and Heat Vents Provided <input type="checkbox" ${item.isBeyondSmokeVent ? 'checked' : ''}/> Yes
                    <input type="checkbox" ${item.isBeyondSmokeVent ? '' : 'checked'}/> No (show locations on floor plan).
                  </li>
                  <li>
                    High Piled Storage Area in Cubic Feet <input type="text" /> cu. ft.
                    # of Vents Required: <input type="text" value = "${item.totalRequiredSmokeVent || ""}"/> # of Vents <br />
                    Provided:
                    <input type="text" value = "${item.beyondSmokeVent || ""}"/>
                  </li>
                  <li>
                    Are Smoke Vents Listed and Labeled to comply w/ FM4430, ICCES AC331,
                    or UL793<input type="checkbox"/> Yes<input type="checkbox" "checked"/> No
                    <br />
                    Link Temperature to be Provided: <input type="text" value = "${item.linkTemperature || ""}" /> 0F
                  </li>
                </ul>
                <p class="text-left declaration-text">
                  I HEREBY CERTIFY THAT THE ABOVE INFORMATION IS TRUE AND THAT THE
                  STORAGE OF HIGH-PILED STOCK WILL BE LIMITED AS INDICATED ABOVE.
                </p>
                <p class="signature-text">
                  <span>Signature</span>
                  <input class="signature-input" type="text" name="" id="" />
        
                  <span class="date">Date</span><input class="date-input" type="text" value = "${date}" />
                </p>
                <p class="signature-name">
                  (building owner, occupant, or HPS consultant)
                </p>
              </div>
              <div class="page-break"></div>
              `).join('')}
            </div>
          </body>
        </html>
      `;

  const options = {
    format: 'A4',
    orientation: 'portrait',
    border: '10mm',
  };
  const pdfBuffer = await pdf.generatePdf({ content }, options);

  return pdfBuffer
}

module.exports = {
  createPdf,
}