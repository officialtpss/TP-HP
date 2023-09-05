const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const tableName = 'commodity';

const Commodity = sequelize.define(
  'Commodity',
  {
    container_type: {
      type: Sequelize.TEXT,
      get() {
        return this.getDataValue('container_type') ? JSON.parse(this.getDataValue('container_type')) : '';
      },
      set(value) {
        return this.setDataValue('container_type', JSON.stringify(value));
      },
    },
    pallet_type: {
      type: Sequelize.TEXT,
      get() {
        return this.getDataValue('pallet_type') ? JSON.parse(this.getDataValue('pallet_type')) : '';
      },
      set(value) {
        return this.setDataValue('pallet_type', JSON.stringify(value));
      },
    },
    shelving_type: {
      type: Sequelize.TEXT,
      get() {
        return this.getDataValue('shelving_type') ? JSON.parse(this.getDataValue('shelving_type')) : '';
      },
      set(value) {
        return this.setDataValue('shelving_type', JSON.stringify(value));
      },
    },
    commodity_class: {
      type: Sequelize.TEXT,
      get() {
        return this.getDataValue('commodity_class') ? JSON.parse(this.getDataValue('commodity_class')) : '';
      },
      set(value) {
        return this.setDataValue('commodity_class', JSON.stringify(value));
      },
    },
    plastic_pallet_case: {
      type: Sequelize.TEXT,
      get() {
        return this.getDataValue('plastic_pallet_case') ? JSON.parse(this.getDataValue('plastic_pallet_case')) : '';
      },
      set(value) {
        return this.setDataValue('plastic_pallet_case', JSON.stringify(value));
      },
    },
    project_encapsulation: {
      type: Sequelize.TEXT,
      get() {
        return this.getDataValue('project_encapsulation') ? JSON.parse(this.getDataValue('project_encapsulation')) : '';
      },
      set(value) {
        return this.setDataValue('project_encapsulation', JSON.stringify(value));
      },
    },
    code_basis: {
      type: Sequelize.TEXT,
      get() {
        return this.getDataValue('code_basis') ? JSON.parse(this.getDataValue('code_basis')) : '';
      },
      set(value) {
        return this.setDataValue('code_basis', JSON.stringify(value));
      },
    },
    container_size: {
      type: Sequelize.STRING,
    },
    internal_description: {
      type: Sequelize.TEXT,
    },
    short_description: {
      type: Sequelize.TEXT,
    },
    full_description: {
      type: Sequelize.TEXT,
    },
    nfpa_exception: {
      type: Sequelize.STRING,
    },
    nfpa_fig: {
      type: Sequelize.STRING,
    },
    oversize_loaded: {
      type: Sequelize.STRING,
    },
    on_top_container: {
      type: Sequelize.STRING,
    },
    configure_exlicit: {
      type: Sequelize.STRING,
    },
    freeze_output: {
      type: Sequelize.STRING,
    },
    width_ft: {
      type: Sequelize.STRING,
    },
    depth_ft: {
      type: Sequelize.STRING,
    },
    area_sf: {
      type: Sequelize.STRING,
    },
    dimenssion_narrative: {
      type: Sequelize.STRING,
    },
    final_narrative: {
      type: Sequelize.TEXT,
    },
    gross_load_weight: {
      type: Sequelize.STRING,
    },
    gross_load_volume: {
      type: Sequelize.STRING,
    },
    net_plastic_weight: {
      type: Sequelize.STRING,
    },
    net_plastic_volume: {
      type: Sequelize.STRING,
    },
    expanded_plastic_content: {
      type: Sequelize.STRING,
    },
    unexp_plastic: {
      type: Sequelize.STRING,
    },
    exp_plastic: {
      type: Sequelize.STRING,
    },
    include_load_narrative: {
      type: Sequelize.STRING,
    },
    plastic_percentage_narrative: {
      type: Sequelize.STRING,
    },
    storage_config: {
      type: Sequelize.STRING,
    },
    max_storagge_height: {
      type: Sequelize.STRING,
    },
    max_height_suffix: {
      type: Sequelize.STRING,
    },
    low_class: {
      type: Sequelize.STRING,
    },
    high_class: {
      type: Sequelize.STRING,
    },
    final_class: {
      type: Sequelize.STRING,
    },
    is_global: {
      type: Sequelize.ENUM,
      values: ['yes', 'no'],
      defaultValue: 'no',
    },
    status: {
      type: Sequelize.ENUM,
      values: ['active', 'deleted'],
      defaultValue: 'active',
    },
  },
  {
    tableName,
  },
  {
    underscored: true,
  },
);
// eslint-disable-next-line
Commodity.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = Commodity;
