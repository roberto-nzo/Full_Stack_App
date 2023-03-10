import { Sequelize, Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional } from 'sequelize'

const sequelize = new Sequelize('mysql://root:@localhost:3306/school-sys', {
  logging: false
})

class Classes extends Model<InferAttributes<Classes>, InferCreationAttributes<Classes>>{
  declare id: CreationOptional<number>
  declare classname: string

  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

Classes.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    classname: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    sequelize,
    tableName: 'classes'
  }
)

async function classes() {
  await sequelize.sync()
}

classes()

export default Classes