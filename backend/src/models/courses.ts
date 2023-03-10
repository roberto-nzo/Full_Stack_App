import { Sequelize, Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional } from 'sequelize'

let sequelize: any
if (process.env.NODE_ENV === 'production') {
  sequelize = new Sequelize(`${process.env.MYSQL_URL}`, {
    logging: false
  })
} else {
  sequelize = new Sequelize('mysql://root:@localhost:3306/school-sys', {
    logging: false
  })
}


class Courses extends Model<InferAttributes<Courses>, InferCreationAttributes<Courses>>{
  declare id: CreationOptional<number>
  declare coursename: string

  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

Courses.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    coursename: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    sequelize: sequelize,
    tableName: 'courses'
  }
)

async function courses() {
  await sequelize.sync()
}

courses()

export default Courses