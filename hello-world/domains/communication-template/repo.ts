import { connection } from '@libs/database/rds'
import { RowDataPacket } from 'mysql2'
import {get as getCache, set as setCache} from '@services/cache'

const CacheTag = 'CommunicationTemplate'

export const getTemplateByCode = async (code: string, language = 'en') => {

  const cacheData = await getCache({tag: CacheTag, key: code})
  if (cacheData) {
    console.log('Get template from cache', {code})
    return JSON.parse(cacheData)[language]
  }

  const [rows] = await connection.query<RowDataPacket[]>(`SELECT message_body FROM communication_templates WHERE code = ?`, [code])
  if (rows.length === 0 || rows[0].length === 0) {
    return null
  }
  
  if (typeof rows[0][0] !== 'object') {
    throw new Error('Incorrect json format')
  }
  console.log('Set cache template ', {code})
  await setCache({tag: CacheTag, key: code, value: JSON.stringify(rows[0][0]), expiredIn: 600})

  console.log('Get template from DB', {code})
  return rows[0][0][language]
}