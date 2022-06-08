import { connection } from '@libs/database/rds'
import { RowDataPacket } from 'mysql2'

export const getTemplateByCode = async (code: string, language = 'en') => {
  const [rows] = await connection.query<RowDataPacket[]>(`SELECT message_body FROM communication_templates WHERE code = ?`, [code])
  if (rows.length === 0 || rows[0].length === 0) {
    return null
  }
  
  if (typeof rows[0][0] !== 'object') {
    throw new Error('Incorrect json format')
  }
  
  return rows[0][0][language]
}