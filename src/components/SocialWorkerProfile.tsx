import React, { useState } from 'react';
import { 
  UserCheck, 
  ClipboardList, 
  MessageSquare, 
  QrCode, 
  AlertTriangle,
  ArrowLeft,
  User,
  CheckCircle,
  XCircle,
  Clock,
  Shield,
  Database,
  MapPin,
  FileText,
  Timer,
  Brain
} from 'lucide-react';

interface SocialWorkerProfileProps {
  onBack: () => void;
}

const SocialWorkerProfile: React.FC<SocialWorkerProfileProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('validation');
  const [validationTime, setValidationTime] = useState(36); // heures
  
  const tabs = [
    { id: 'validation', label: 'Validation Sécurisée', icon: UserCheck },
    { id: 'requests', label: 'Demandes Anonymes', icon: ClipboardList },
    { id: 'qr-codes', label: 'QR Codes 72h', icon: QrCode },
    { id: 'kpi', label: 'KPI Dashboard', icon: AlertTriangle }
  ];

  const pendingProfiles = [
    { 
      id: '1', 
      name: 'Marie Dubois', 
      familySize: 4, 
      income: '1200€', 
      documents: [
        { name: 'Avis d\'imposition 2023', verified: true, confidence: 96 },
        { name: 'Attestation CAF', verified: true, confidence: 98 }
      ], 
      submittedAt: '2024-01-15',
      priority: 'high',
      cafVerified: true,
      geoVerified: true,
      uniqueCode: 'PDS-2024-001'
    },
    { 
      id: '2', 
      name: 'Ahmed Hassan', 
      familySize: 3, 
      income: '950€', 
      documents: [
        { name: 'Justificatif revenus', verified: false, confidence: 78 },
        { name: 'Livret famille', verified: true, confidence: 94 }
      ], 
      submittedAt: '2024-01-14',
      priority: 'medium',
      cafVerified: false,
      geoVerified: true,
      uniqueCode: 'PDS-2024-002'
    }
  ];

  const anonymousRequests = [
    {
      id: '1',
      beneficiary: 'Famille 4 pers. (Code: ***-001)',
      items: ['Riz 2kg', 'Lait 4L', 'Pâtes 1kg'],
      urgency: 'high',
      submittedAt: '2024-01-15',
      status: 'sent_to_donors',
      matchingDonors: 3
    },
    {
      id: '2',
      beneficiary: 'Famille 3 pers. (Code: ***-002)',
      items: ['Pain', 'Légumes', 'Produits hygiène'],
      urgency: 'medium',
      submittedAt: '2024-01-14',
      status: 'approved',
      matchingDonors: 1
    }
  ];

  const qrCodes = [
    { 
      id: 'QR001', 
      beneficiary: 'Marie D.', 
      validUntil: '2024-01-22', 
      status: 'active',
      geoRequired: true,
      remainingHours: 48,
      items: ['Riz 2kg', 'Lait 4L']
    },
    { 
      id: 'QR002', 
      beneficiary: 'Ahmed H.', 
      validUntil: '2024-01-20', 
      status: 'used',
      geoRequired: true,
      remainingHours: 0,
      items: ['Pain', 'Légumes']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center text-blue-100 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="mr-2" size={20} />
            Retour aux profils
          </button>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <UserCheck className="mr-4" size={32} />
              <div>
                <h1 className="text-3xl font-bold">Travailleur Social</h1>
                <p className="text-blue-100">Validation sécurisée • API CAF • QR géolocalisés</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center mb-2">
                <Timer className="mr-2" size={20} />
                <span className="text-sm">Délai validation</span>
              </div>
              <div className="text-2xl font-bold">{validationTime}h</div>
              <div className="text-xs text-blue-200">Objectif: &lt;48h</div>
            </div>
          </div>
          
          <div className="flex space-x-1 bg-blue-700/50 backdrop-blur-sm rounded-lg p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-2 rounded-md transition-all ${
                    activeTab === tab.id 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-blue-100 hover:text-white'
                  }`}
                >
                  <Icon size={18} className="mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {activeTab === 'validation' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-6">Validation Sécurisée des Profils</h2>
              
              <div className="space-y-6">
                {pendingProfiles.map((profile) => (
                  <div key={profile.id} className="border-2 border-gray-200 rounded-xl p-6 bg-gradient-to-r from-gray-50 to-blue-50">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center">
                        <User className="text-gray-500 mr-3" size={24} />
                        <div>
                          <h3 className="text-lg font-semibold">{profile.name}</h3>
                          <p className="text-gray-600">Code unique: {profile.uniqueCode}</p>
                          <p className="text-sm text-gray-500">Soumis le {profile.submittedAt}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          profile.priority === 'high' 
                            ? 'bg-red-100 text-red-600' 
                            : 'bg-yellow-100 text-yellow-600'
                        }`}>
                          Priorité {profile.priority === 'high' ? 'haute' : 'moyenne'}
                        </span>
                        {profile.cafVerified && (
                          <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm flex items-center">
                            <Database className="mr-1" size={14} />
                            CAF ✓
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-4 gap-4 mb-6">
                      <div className="bg-white p-4 rounded-lg border">
                        <p className="text-sm text-gray-600">Taille famille</p>
                        <p className="text-lg font-semibold">{profile.familySize} personnes</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <p className="text-sm text-gray-600">Revenus mensuels</p>
                        <p className="text-lg font-semibold">{profile.income}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <p className="text-sm text-gray-600">Vérifications</p>
                        <div className="flex space-x-1 mt-1">
                          {profile.cafVerified && <Shield className="text-green-500" size={16} />}
                          {profile.geoVerified && <MapPin className="text-blue-500" size={16} />}
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <p className="text-sm text-gray-600">Documents</p>
                        <p className="text-lg font-semibold">{profile.documents.length}/2</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-medium mb-3 flex items-center">
                        <FileText className="mr-2" size={18} />
                        Documents vérifiés par IA:
                      </h4>
                      <div className="space-y-2">
                        {profile.documents.map((doc, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                            <div className="flex items-center">
                              <div className={`w-3 h-3 rounded-full mr-3 ${
                                doc.verified ? 'bg-green-500' : 'bg-red-500'
                              }`}></div>
                              <span className="font-medium">{doc.name}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center">
                                <Brain className="mr-1 text-blue-500" size={14} />
                                <span className="text-sm text-blue-600">{doc.confidence}%</span>
                              </div>
                              {doc.verified ? (
                                <CheckCircle className="text-green-500" size={16} />
                              ) : (
                                <XCircle className="text-red-500" size={16} />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                      <button className="flex items-center px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                        <XCircle className="mr-2" size={16} />
                        Rejeter
                      </button>
                      <button 
                        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        disabled={!profile.cafVerified}
                      >
                        <CheckCircle className="mr-2" size={16} />
                        Valider & Attribuer Code
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Validés ce mois</h3>
                <p className="text-3xl font-bold text-green-600">23</p>
                <p className="text-sm text-green-600">Délai moyen: 36h</p>
              </div>
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-2">En attente</h3>
                <p className="text-3xl font-bold text-yellow-600">8</p>
                <p className="text-sm text-yellow-600">Objectif: &lt;48h</p>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">API CAF</h3>
                <p className="text-3xl font-bold text-blue-600">98%</p>
                <p className="text-sm text-blue-600">Taux de réponse</p>
              </div>
              <div className="bg-gradient-to-r from-red-50 to-red-100 p-6 rounded-lg">
                <h3 className="font-semibold text-red-800 mb-2">Fraudes détectées</h3>
                <p className="text-3xl font-bold text-red-600">2</p>
                <p className="text-sm text-red-600">Ce trimestre</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">Demandes Anonymes aux Donateurs</h2>
            
            <div className="space-y-6">
              {anonymousRequests.map((request) => (
                <div key={request.id} className="border-2 border-gray-200 rounded-xl p-6 bg-gradient-to-r from-gray-50 to-indigo-50">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{request.beneficiary}</h3>
                      <p className="text-gray-600">Demande du {request.submittedAt}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        request.urgency === 'high' 
                          ? 'bg-red-100 text-red-600' 
                          : 'bg-yellow-100 text-yellow-600'
                      }`}>
                        {request.urgency === 'high' ? 'Urgent' : 'Normal'}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        request.status === 'sent_to_donors' 
                          ? 'bg-blue-100 text-blue-600' 
                          : 'bg-green-100 text-green-600'
                      }`}>
                        {request.status === 'sent_to_donors' ? 'Envoyé aux donateurs' : 'Approuvé'}
                      </span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <h4 className="font-medium mb-2">Articles demandés:</h4>
                      <div className="flex flex-wrap gap-2">
                        {request.items.map((item, index) => (
                          <span key={index} className="px-3 py-1 bg-white border rounded-full text-sm">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Donateurs compatibles:</h4>
                      <div className="flex items-center">
                        <div className="text-2xl font-bold text-blue-600">{request.matchingDonors}</div>
                        <span className="ml-2 text-sm text-gray-600">ménages intéressés</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <Shield className="text-blue-600 mr-2" size={20} />
                      <p className="text-blue-800 font-medium">
                        Demande anonymisée - Identité protégée
                      </p>
                    </div>
                    <p className="text-blue-600 text-sm mt-1">
                      Seules les informations essentielles (taille famille, besoins) sont partagées
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'qr-codes' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-6">QR Codes Sécurisés (Validité 72h)</h2>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-6">
                <div className="flex items-center mb-4">
                  <QrCode className="text-blue-600 mr-3" size={24} />
                  <h3 className="text-lg font-semibold text-blue-800">Génération avec géolocalisation</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bénéficiaire validé
                    </label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option>Marie Dubois (PDS-2024-001)</option>
                      <option>Ahmed Hassan (PDS-2024-002)</option>
                      <option>Sophie Martin (PDS-2024-003)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Association de retrait
                    </label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option>Restos du Cœur - Marseille</option>
                      <option>Secours Populaire - Aix</option>
                      <option>Banque Alimentaire - Toulon</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-white rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Paramètres de sécurité:</span>
                    <div className="flex space-x-4 text-sm">
                      <div className="flex items-center text-green-600">
                        <MapPin className="mr-1" size={14} />
                        Géolocalisation requise
                      </div>
                      <div className="flex items-center text-blue-600">
                        <Timer className="mr-1" size={14} />
                        Validité: 72h
                      </div>
                    </div>
                  </div>
                </div>
                
                <button className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                  <QrCode className="mr-2" size={20} />
                  Générer QR Code Sécurisé
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">QR Codes Actifs</h3>
              <div className="space-y-4">
                {qrCodes.map((qr) => (
                  <div key={qr.id} className="border-2 border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <QrCode className="text-blue-600 mr-3" size={24} />
                        <div>
                          <p className="font-medium">{qr.id} - {qr.beneficiary}</p>
                          <p className="text-sm text-gray-600">Valide jusqu'au {qr.validUntil}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {qr.geoRequired && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center">
                            <MapPin className="mr-1" size={12} />
                            Géo
                          </span>
                        )}
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          qr.status === 'active' 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {qr.status === 'active' ? 'Actif' : 'Utilisé'}
                        </span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Articles autorisés:</p>
                        <div className="flex flex-wrap gap-1">
                          {qr.items.map((item, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Temps restant:</p>
                        <div className={`text-lg font-bold ${
                          qr.remainingHours > 24 ? 'text-green-600' : 
                          qr.remainingHours > 0 ? 'text-orange-600' : 'text-red-600'
                        }`}>
                          {qr.remainingHours > 0 ? `${qr.remainingHours}h` : 'Expiré'}
                        </div>
                      </div>
                    </div>

                    {qr.status === 'active' && qr.remainingHours < 24 && (
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                        <div className="flex items-center">
                          <AlertTriangle className="text-orange-600 mr-2" size={16} />
                          <p className="text-orange-800 text-sm font-medium">
                            Expiration imminente - Moins de 24h restantes
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'kpi' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-6">Dashboard KPI - Objectifs de Performance</h2>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg border-2 border-green-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-green-800">Délai de validation</h3>
                    <Timer className="text-green-600" size={24} />
                  </div>
                  <div className="text-3xl font-bold text-green-600 mb-2">36h</div>
                  <div className="text-sm text-green-600">Objectif: &lt;48h ✓</div>
                  <div className="w-full bg-green-200 rounded-full h-2 mt-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '75%'}}></div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border-2 border-blue-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-blue-800">Précision IA Documents</h3>
                    <Brain className="text-blue-600" size={24} />
                  </div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">94%</div>
                  <div className="text-sm text-blue-600">Objectif: ≥90% ✓</div>
                  <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '94%'}}></div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-lg border-2 border-purple-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-purple-800">Taux d'utilisation QR</h3>
                    <QrCode className="text-purple-600" size={24} />
                  </div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">98%</div>
                  <div className="text-sm text-purple-600">Objectif: 98% ✓</div>
                  <div className="w-full bg-purple-200 rounded-full h-2 mt-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{width: '98%'}}></div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Statistiques Mensuelles</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Profils validés</span>
                      <span className="font-semibold">23</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Demandes traitées</span>
                      <span className="font-semibold">45</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">QR codes générés</span>
                      <span className="font-semibold">38</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Familles aidées</span>
                      <span className="font-semibold">42</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Taux de fraude détecté</span>
                      <span className="font-semibold text-green-600">0.8%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Intégrations API</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Database className="text-green-500 mr-2" size={16} />
                        <span>API CAF</span>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">
                        Actif - 98%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <MapPin className="text-blue-500 mr-2" size={16} />
                        <span>Géolocalisation</span>
                      </div>
                      <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">
                        Actif - 100%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Shield className="text-purple-500 mr-2" size={16} />
                        <span>Chiffrement AES-256</span>
                      </div>
                      <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-xs">
                        Actif
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Brain className="text-orange-500 mr-2" size={16} />
                        <span>IA Document</span>
                      </div>
                      <span className="px-2 py-1 bg-orange-100 text-orange-600 rounded-full text-xs">
                        Actif - 94%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Actions Rapides</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <button className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  Créer un parcours d'accompagnement
                </button>
                <button className="border border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-50 transition-colors">
                  Planifier un entretien
                </button>
                <button className="border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                  Générer rapport mensuel
                </button>
                <button className="border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                  Configurer alertes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialWorkerProfile;