import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Generator = new Schema({
  generator_type: {type: String, required: true},
  engine_type: {type: String, required: true},
  fuel_type: {type: String, required: true},
  power: {type: String, required: true},
  max_power: {type: String, required: true},
  nom_power: {type: String, required: true},
  noise_level: {type: String, required: true},
  fuel_container: {type: String, required: true},
  fuel_consumption: {type: String, required: true},
  starter_type: {type: String, required: true},
  alternating_current: {type: String, required: true},
  oil_level_safety: {type: String, required: true},
  over_voltage_safety: {type: String, required: true},
  work_time: {type: String, required: true},
  single_phase_connection_number: {type: String, required: true},
  voltmeter: {type: String, required: true},
  voltage_regulator: {type: String, required: true},
  has_wheels: {type: String, required: true}
})

const RotaryHammers = new Schema({
  model: {type:String, required:true},
  weight: {type:String, required:true},
  power: {type:String, required:true},
  rotations_per_minute: {type:String, required:true},
  impacts_per_minute: {type:String, required:true},
  impact_energy: {type:String, required:true},
  type_of_cartrige: {type:String, required:true},
  max_drill_diameter_cement: {type:String, required:true},
  max_drill_diameter_metal: {type:String, required:true},
  max_drill_diameter_wood: {type:String, required:true},
  cable_length: {type:String, required:true},
  depth_protection: {type:Boolean, required:true},
  drilling_with_impact: {type:Boolean, required:true},
  drilling_without_impact: {type:Boolean, required:true},
})

const ElectricRouters = new Schema({
  weight: {type: String, required: true},
  power: {type: String, required: true},
  max_mill_depth: {type: String, required: true},
  noise_level: {type: String, required: true},
  cable_length: {type: String, required: true},
})

const Vacuums = new Schema({
  container_size: {type: String, required: true},
  height: {type: String, required: true},
  width: {type: String, required: true},
  power: {type: String, required: true},
  dry_vacuum: {type: Boolean, required: true},
  liquid_vacuum: {type: Boolean, required: true},
  vacuum_type: {type: String, required: true},
  cable_lenght: {type: String, required: true}
})

const Basic = new Schema({
  width: String,
  height: String,
  weight: String,
  length: String,
  power: String,
  alternating_current: String,
  rotations_per_minute: String,
})

const toolsSchema = new Schema({
  toolType: { type: String, required: false},
  description: {
    nameRetail: { type: String, required: false},
    basePrice: { type: String, required: false},
    imageURIs: [String],
    details: {
      productType:{type: String, required: false},
      trademark:{type: String, required: false},
      model: String,
      generator_type: String,
      engine_type: String,
      fuel_type: String,
      power: String,
      max_power: String,
      nom_power: String,
      noise_level: String,
      fuel_container: String,
      fuel_consumption: String,
      starter_type: String,
      alternating_current: String,
      oil_level_safety: Boolean,
      over_voltage_safety: Boolean,
      work_time: String,
      single_phase_connection_number: String,
      voltmeter: Boolean,
      voltage_regulator: Boolean,
      has_wheels: Boolean,
      length: String,
      has_handles: Boolean,
      width: String,
      height: String,
      weight: String,
      impacts_per_minute: String,
      impact_energy: String,
      type_of_cartrige: String,
      max_drill_diameter_cement: String,
      max_drill_diameter_wood: String,
      max_drill_diameter_metal: String,
      cable_length: String,
      depth_protection: Boolean,
      drilling_with_impact: Boolean,
      drilling_without_impact: Boolean,
      rotations_per_minute: String,
      max_mill_depth: String,
      container_size: String,
      dry_vacuum: Boolean,
      liquid_vacuum: Boolean,
      vacuum_type: String,
      chainsaw_type: String,
      motor_type: String,
      anti_vibration: Boolean,
      chain_brakes: String,
      charger: Boolean,
      requires_batery: Boolean,
      chain_step: String,
      power_supply_type: String,
      saw_blade_diameter: String,
      rotation_angle: String,
      saw_hole_diameter: String,
      adjustable_support: Boolean,
      additional_information: String,
      warranty: {type: String, required: false},
      company_warranty: {type: String, required: false},
      origin_country: {type: String, required: false}
    },
    additionall_information: {type: String, required: false}
  },
  isAvailable: { type: Boolean, required: true, default: false },
  isVisible: { type: Boolean, required: true, default: false },
  isDraft: { type: Boolean, required: true, default: true },
  reservation: [{ type: String, default: '' }],
  reviews: [{ type: String, default: '' }]
}, {timestamps: {createdAt: "createdAt"}});

export default mongoose.model('Tools', toolsSchema)