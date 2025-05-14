export const schemaData = [
  {
    name: "ClinicalIntakeForm",
    description: "A schema-driven intake form that adapts based on practitioner type and patient context",
    fields: [
      {
        name: "patientName",
        type: "string",
        description: "Patient's full name",
        required: true,
      },
      {
        name: "dateOfBirth",
        type: "date",
        description: "Patient's date of birth",
        required: true,
      },
      {
        name: "chiefComplaint",
        type: "textarea",
        description: "Primary reason for visit",
        required: true,
      },
      {
        name: "painLevel",
        type: "slider",
        description: "Current pain level (0-10)",
        required: false,
        conditional: {
          field: "chiefComplaint",
          value: "pain",
        },
      },
      {
        name: "painLocation",
        type: "bodyMap",
        description: "Location of pain on body map",
        required: false,
        conditional: {
          field: "painLevel",
          value: 1,
        },
      },
      {
        name: "previousTreatments",
        type: "multiSelect",
        description: "Previous treatments attempted",
        required: false,
      },
      {
        name: "practitionerNotes",
        type: "richText",
        description: "Practitioner's clinical notes",
        required: true,
      },
    ],
    renderedExample: `
      <div class="space-y-4">
        <div class="space-y-2">
          <label class="block text-sm font-medium">Patient's Full Name</label>
          <input type="text" class="w-full px-3 py-2 border rounded-md" placeholder="Enter patient name" />
        </div>
        
        <div class="space-y-2">
          <label class="block text-sm font-medium">Date of Birth</label>
          <input type="date" class="w-full px-3 py-2 border rounded-md" />
        </div>
        
        <div class="space-y-2">
          <label class="block text-sm font-medium">Chief Complaint</label>
          <textarea class="w-full px-3 py-2 border rounded-md" rows="3" placeholder="Describe primary reason for visit"></textarea>
        </div>
        
        <div class="space-y-2">
          <label class="block text-sm font-medium">Pain Level (0-10)</label>
          <input type="range" min="0" max="10" value="5" class="w-full" />
          <div class="flex justify-between text-xs">
            <span>0</span>
            <span>5</span>
            <span>10</span>
          </div>
        </div>
        
        <div class="space-y-2">
          <label class="block text-sm font-medium">Pain Location</label>
          <div class="border rounded-md p-4 text-center bg-gray-50">
            [Body Map Visualization]
          </div>
        </div>
        
        <div class="space-y-2">
          <label class="block text-sm font-medium">Previous Treatments</label>
          <div class="space-y-1">
            <div class="flex items-center">
              <input type="checkbox" id="pt1" class="mr-2" />
              <label for="pt1">Physical Therapy</label>
            </div>
            <div class="flex items-center">
              <input type="checkbox" id="pt2" class="mr-2" />
              <label for="pt2">Medication</label>
            </div>
            <div class="flex items-center">
              <input type="checkbox" id="pt3" class="mr-2" />
              <label for="pt3">Surgery</label>
            </div>
            <div class="flex items-center">
              <input type="checkbox" id="pt4" class="mr-2" />
              <label for="pt4">Alternative Medicine</label>
            </div>
          </div>
        </div>
        
        <div class="space-y-2">
          <label class="block text-sm font-medium">Practitioner Notes</label>
          <div class="border rounded-md p-2">
            [Rich Text Editor]
          </div>
        </div>
      </div>
    `,
  },
  {
    name: "ProgressNoteSchema",
    description: "A schema for clinical progress notes that adapts based on previous visit data and treatment plan",
    fields: [
      {
        name: "visitDate",
        type: "date",
        description: "Date of current visit",
        required: true,
      },
      {
        name: "subjective",
        type: "richText",
        description: "Subjective information provided by patient",
        required: true,
      },
      {
        name: "objective",
        type: "richText",
        description: "Objective findings from examination",
        required: true,
      },
      {
        name: "assessment",
        type: "richText",
        description: "Clinical assessment and diagnosis",
        required: true,
      },
      {
        name: "plan",
        type: "richText",
        description: "Treatment plan and next steps",
        required: true,
      },
      {
        name: "progressTowardGoals",
        type: "progressTracker",
        description: "Progress toward established treatment goals",
        required: false,
      },
      {
        name: "followUpInterval",
        type: "select",
        description: "Recommended time until next visit",
        required: true,
      },
    ],
    renderedExample: `
      <div class="space-y-4">
        <div class="space-y-2">
          <label class="block text-sm font-medium">Visit Date</label>
          <input type="date" class="w-full px-3 py-2 border rounded-md" />
        </div>
        
        <div class="space-y-2">
          <label class="block text-sm font-medium">Subjective</label>
          <div class="border rounded-md p-2">
            [Rich Text Editor]
          </div>
        </div>
        
        <div class="space-y-2">
          <label class="block text-sm font-medium">Objective</label>
          <div class="border rounded-md p-2">
            [Rich Text Editor]
          </div>
        </div>
        
        <div class="space-y-2">
          <label class="block text-sm font-medium">Assessment</label>
          <div class="border rounded-md p-2">
            [Rich Text Editor]
          </div>
        </div>
        
        <div class="space-y-2">
          <label class="block text-sm font-medium">Plan</label>
          <div class="border rounded-md p-2">
            [Rich Text Editor]
          </div>
        </div>
        
        <div class="space-y-2">
          <label class="block text-sm font-medium">Progress Toward Goals</label>
          <div class="space-y-3">
            <div>
              <div class="flex justify-between text-xs mb-1">
                <span>Goal: Increase range of motion</span>
                <span>75% complete</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-green-600 h-2 rounded-full" style="width: 75%"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between text-xs mb-1">
                <span>Goal: Reduce pain level</span>
                <span>60% complete</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-green-600 h-2 rounded-full" style="width: 60%"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="space-y-2">
          <label class="block text-sm font-medium">Follow-up Interval</label>
          <select class="w-full px-3 py-2 border rounded-md">
            <option>1 week</option>
            <option>2 weeks</option>
            <option>1 month</option>
            <option>3 months</option>
            <option>As needed</option>
          </select>
        </div>
      </div>
    `,
  },
]
