import { Sequelize, Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional, HasManyAddAssociationMixin, Association, HasManySetAssociationsMixin, HasManyGetAssociationsMixin, HasOneSetAssociationMixin } from 'sequelize'
import { json } from 'stream/consumers'
import Classes from './classes'
import Courses from './courses'

const sequelize = new Sequelize('mysql://root:@localhost:3306/school-sys', {
  logging: false
})


class Students extends Model<InferAttributes<Students, { omit: never }>, InferCreationAttributes<Students, { omit: never }>>{
  declare id: CreationOptional<number>
  declare firstname: string
  declare lastname: string
  declare age: number
  declare picture: CreationOptional<string>
  declare password: string

  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
  declare ClassId: CreationOptional<number>
  declare getCourse: HasManyGetAssociationsMixin<Courses>
  declare addCourse: HasManyAddAssociationMixin<Courses, 'id'>
  declare setCourses: HasManySetAssociationsMixin<Courses, 'id'>
  declare setClass: HasOneSetAssociationMixin<Classes, 'id'>

  declare static associations: {
    classes: Association<Students, Classes>
  }
}

Students.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    firstname: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true
    },
    lastname: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    picture: {
      type: new DataTypes.STRING(128),
      allowNull: true
    },
    password: {
      type: new DataTypes.STRING(128)
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    ClassId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: sequelize,
    tableName: 'students'
  }
)

async function students() {
  await sequelize.sync()
}

students()

export default Students
