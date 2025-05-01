// Datos extraídos de modalContents en appwebv2/js/main.js y presentacionidea.txt
// Valores MLE son aproximados para Nivel 3, 2025. MAI no tiene valor monetario directo en arancel.

const orlData = [
    // --- MAI (Ejemplos Clave y Adicionales) ---
    { code: '1302077-7', description: 'Implante activo de oído medio', modality: 'MAI', area: 'Oído', type: 'Pabellón', value: 'N/A' },
    { code: '1302086-7', description: 'Timpanoplastía funcional con reconstrucción de cadena osicular', modality: 'MAI', area: 'Oído', type: 'Pabellón', value: 'N/A' },
    { code: '1302093-7', description: 'Reparación de válvula nasal', modality: 'MAI', area: 'Nariz', type: 'Pabellón', value: 'N/A' },
    { code: '1302080-6', description: 'Plastía o dilatación por vía endoscópica trompa de Eustaquio', modality: 'MAI', area: 'Oído', type: 'Pabellón', value: 'N/A' },
    { code: '1302094-7', description: 'Resección tumor base cráneo anterior c/reparación duramadre (Ej: Colgajo Hadad)', modality: 'MAI', area: 'Nariz', type: 'Pabellón', value: 'N/A' },
    { code: '1302097-6', description: 'Tumor de espacio parafaríngeo, extirpación', modality: 'MAI', area: 'Cuello', type: 'Pabellón', value: 'N/A' },
    { code: '1302088-6', description: 'Tiroplastia 1-4', modality: 'MAI', area: 'Laringe', type: 'Pabellón', value: 'N/A' },
    // Códigos MAI adicionales mencionados en fuentes
    { code: '1302079-7', description: 'Aticotomía (excluye timpanoplastia funcional)', modality: 'MAI', area: 'Oído', type: 'Pabellón', value: 'N/A' },
    { code: '1302082-7', description: 'Reparación de brecha osteomeníngea vía transtemporal', modality: 'MAI', area: 'Oído', type: 'Pabellón', value: 'N/A' },
    { code: '1302085-7', description: 'Timpanectomía con o sin tubos de ventilación', modality: 'MAI', area: 'Oído', type: 'Pabellón', value: 'N/A' },
    { code: '1302087-6', description: 'Timpanotomía exploradora', modality: 'MAI', area: 'Oído', type: 'Pabellón', value: 'N/A' },
    { code: '1302089-5', description: 'Toma de injerto cartílago tragal', modality: 'MAI', area: 'Oído', type: 'Pabellón', value: 'N/A' },
    { code: '1302090-5', description: 'Toma de injerto fascia temporal', modality: 'MAI', area: 'Oído', type: 'Pabellón', value: 'N/A' },
    { code: '1302096-5', description: 'Tumor benigno nasosinusal/rinofaríngeo, resección endoscópica', modality: 'MAI', area: 'Nariz', type: 'Pabellón', value: 'N/A' },
    { code: '1302098-8', description: 'Tumor maligno nasosinusal/rinofaríngeo, tto. quirúrgico endoscópico', modality: 'MAI', area: 'Nariz', type: 'Pabellón', value: 'N/A' },
    { code: '11302105-6', description: 'Subluxación articulación cricotiroídea', modality: 'MAI', area: 'Laringe', type: 'Pabellón', value: 'N/A' }, // Código parece tener un dígito extra, revisar fuente original si es posible
    { code: '1302075-8', description: 'Fractura laríngea, reducción abierta c/s microplacas', modality: 'MAI', area: 'Laringe', type: 'Pabellón', value: 'N/A' },

    // --- MLE Urgencia (Oído) ---
    { code: '1301042', description: 'Extracción cuerpo extraño/cerumen Adulto', modality: 'MLE', area: 'Oído', type: 'Urgencia', value: '~ $7.280' },
    { code: '1301043', description: 'Extracción cuerpo extraño/cerumen Niño', modality: 'MLE', area: 'Oído', type: 'Urgencia', value: '~ $21.810' },
    { code: '1301040', description: 'Curación oído bajo microscopio', modality: 'MLE', area: 'Oído', type: 'Urgencia', value: '~ $7.280' },
    { code: '1302002-3', description: 'Extracción cuerpo extraño CAE (¿Pabellón?)', modality: 'MLE', area: 'Oído', type: 'Urgencia/Pabellón', value: '~ $73.890' },
    { code: '1302001-0', description: 'Absceso/Hematoma oído externo Tto. Quir.', modality: 'MLE', area: 'Oído', type: 'Urgencia', value: 'Guarismo 0 (Valor bajo)' },

    // --- MLE Urgencia (Nariz) ---
    { code: 'N/A', description: 'Taponamiento anterior epistaxis', modality: 'MLE', area: 'Nariz', type: 'Urgencia', value: '~ $7.680' }, // Código exacto no especificado, usar descripción
    { code: 'N/A', description: 'Taponamiento posterior epistaxis', modality: 'MLE', area: 'Nariz', type: 'Urgencia', value: '~ $22.370' }, // Código exacto no especificado, usar descripción
    { code: '1302046', description: 'Reducción fractura nasal', modality: 'MLE', area: 'Nariz', type: 'Urgencia', value: '~ $50.480' },
    { code: '1302038', description: 'Absceso/Hematoma tabique nasal Tto. Quir.', modality: 'MLE', area: 'Nariz', type: 'Urgencia', value: '~ $54.620' },

    // --- MLE Urgencia (Cav. Oral / Faringe) ---
    { code: '1302025', description: 'Absceso periamigdalino Tto. Quir.', modality: 'MLE', area: 'Faringe', type: 'Urgencia', value: '~ $61.650' },
    { code: '1302026', description: 'Absceso retrofaríngeo/faringolaríngeo Tto. Quir.', modality: 'MLE', area: 'Faringe', type: 'Urgencia', value: '~ $61.650' },
    { code: '1302023', description: 'Absceso piso de boca Tto. Quir.', modality: 'MLE', area: 'Cav. Oral', type: 'Urgencia', value: '~ $34.780' },

    // --- MLE Urgencia (Alternativas Plástica/Derma) ---
    { code: '1502001-4', description: '(Plástica) Herida cara complicada >5cm', modality: 'MLE', area: 'Cara', type: 'Urgencia', value: '~ $196.840' },
    { code: '1502001-2', description: '(Plástica) Herida cara simple <5cm', modality: 'MLE', area: 'Cara', type: 'Urgencia', value: '~ $61.650' },
    { code: '1602221-3', description: '(Derma) Herida complicada reparación >5cm', modality: 'MLE', area: 'Piel', type: 'Urgencia', value: '~ $128.560' },
    { code: '1602222-2', description: '(Derma) Herida no complicada reparación <5cm', modality: 'MLE', area: 'Piel', type: 'Urgencia', value: '~ $36.610' },
    { code: '1602225-2', description: '(Derma) Vaciamiento absceso/quiste NE', modality: 'MLE', area: 'Piel', type: 'Urgencia', value: '~ $90.030' },
    { code: '1402054', description: '(Maxilofacial) Reducción cerrada fractura maxilofacial', modality: 'MLE', area: 'Cara', type: 'Urgencia/Pabellón', value: '~ $133.940' }, // Aplicable fractura nasal compleja

    // --- MLE Pabellón (Nariz / CPN) ---
    { code: '1502014', description: '(Plástica) Plastia en Z hasta 3 (Sinequias)', modality: 'MLE', area: 'Nariz', type: 'Pabellón', value: '~ $191.408' },
    { code: '1502021', description: '(Plástica) Colgajo simple único (Endonasal)', modality: 'MLE', area: 'Nariz', type: 'Pabellón', value: '~ $174.888' },
    { code: '1402037', description: '(Maxilofacial) Maxilectomía parcial (Reoperaciones CEF?)', modality: 'MLE', area: 'Nariz', type: 'Pabellón', value: 'Consultar Arancel' }, // Valor no especificado
    { code: '1302052', description: 'Septoplastia', modality: 'MLE', area: 'Nariz', type: 'Pabellón', value: 'Consultar Arancel' },
    { code: '1302042', description: 'Turbinectomía uni o bilateral', modality: 'MLE', area: 'Nariz', type: 'Pabellón', value: 'Consultar Arancel' },
    { code: '1502012', description: '(Plástica) Injerto cartílago/hueso (Rinoplastia)', modality: 'MLE', area: 'Nariz', type: 'Pabellón', value: 'Consultar Arancel' },
    // Códigos PPC Rinoplastia (Ej. Indisa) - Referenciales, verificar políticas
    { code: '5302000', description: '(PPC) Código Base Estético Rinoplastia', modality: 'PPC/Estético', area: 'Nariz', type: 'Pabellón', value: 'Variable' },
    { code: 'C1/C2', description: '(PPC) Modificador Complejidad Rinoplastia', modality: 'PPC/Estético', area: 'Nariz', type: 'Pabellón', value: 'Variable' },
    { code: '1350052-(2,4,6)', description: '(PPC) Tiempo Pabellón Particular/Fonasa s/Seguro', modality: 'PPC/Estético', area: 'N/A', type: 'Pabellón', value: 'Variable' },

    // --- MLE Pabellón (Oído) ---
    { code: '1301041', description: 'Dilatación trompa Eustaquio', modality: 'MLE', area: 'Oído', type: 'Pabellón', value: 'Guarismo 0' },
    { code: '1302008', description: 'Tto. Quir. Otitis Media c/ Efusión (Tubos)', modality: 'MLE', area: 'Oído', type: 'Pabellón', value: 'Consultar Arancel' },
    { code: '1502035', description: '(Plástica) Plastia de velo (cualquier técnica)', modality: 'MLE', area: 'Faringe', type: 'Pabellón', value: 'Consultar Arancel' }, // Relacionado a función tubaria?
    { code: '1302065', description: 'Miringoplastia', modality: 'MLE', area: 'Oído', type: 'Pabellón', value: 'Consultar Arancel' },
    { code: '1302068', description: 'Timpanoplastia Tipo I-V (genérico)', modality: 'MLE', area: 'Oído', type: 'Pabellón', value: 'Consultar Arancel' }, // Puede haber códigos más específicos por tipo
    { code: '1302014', description: 'Mastoidectomía simple', modality: 'MLE', area: 'Oído', type: 'Pabellón', value: 'Consultar Arancel' },
    { code: '1302015', description: 'Mastoidectomía radical o modificada', modality: 'MLE', area: 'Oído', type: 'Pabellón', value: 'Consultar Arancel' },
    { code: '1302076', description: 'Implante coclear (u otro implante auditivo)', modality: 'MLE', area: 'Oído', type: 'Pabellón', value: 'Consultar Arancel' },

    // --- MLE Pabellón (Cav. Oral / Faringe / Laringe) ---
    { code: '1602201', description: '(Derma) Biopsia benigna mucosa (Tronco/Ext)', modality: 'MLE', area: 'Piel', type: 'Pabellón', value: 'Consultar Arancel' },
    { code: '1602202', description: '(Derma) Biopsia benigna mucosa (Cabeza/Cuello <3)', modality: 'MLE', area: 'Piel', type: 'Pabellón', value: 'Consultar Arancel' },
    { code: '1301007', description: 'Laringoscopia/Traqueoscopia directa s/micro (Cambio TQT?)', modality: 'MLE', area: 'Laringe', type: 'Pabellón', value: '~ $29.890' },
    { code: '1301013', description: 'Fibro LTB (Cambio TQT?)', modality: 'MLE', area: 'Laringe', type: 'Pabellón', value: '~ $74.540' },

    // --- MLE Pabellón (Cuello / Misceláneo) ---
    { code: '1402019', description: '(Maxilofacial) Absceso submandibular/sublingual Tto. Quir.', modality: 'MLE', area: 'Cuello', type: 'Pabellón', value: 'Consultar Arancel' },
    { code: '1402024', description: 'Tto. Quir. Quiste Tirogloso/Branquial/Higroma/T.Benigno', modality: 'MLE', area: 'Cuello', type: 'Pabellón', value: 'Consultar Arancel' },
    
    // --- Anestesia ---
    { code: '22-01-001', description: 'Anestesia para proc. diag./terapéuticos (local)', modality: 'MLE', area: 'N/A', type: 'Anestesia', value: '~ $61.550' }

];

// Exportar si se usa como módulo (opcional para este script simple)
// export { orlData }; 