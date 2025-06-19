import React, { useState } from 'react';
import { 
  Heart, 
  Clock, 
  CheckCircle, 
  XCircle, 
  QrCode,
  ArrowLeft,
  MessageCircle,
  Calendar,
  Package,
  Shield,
  FileText,
  MapPin,
  Timer,
  AlertTriangle
} from 'lucide-react';

interface BeneficiaryProfileProps {
  onBack: () => void;
}

const BeneficiaryProfile: React.FC<BeneficiaryProfileProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('requests');
  
  const tabs = [
    { id: 'requests', label: 'Mes Demandes', icon: Heart },
    { id: 'history', label: 'Historique Complet', icon: Clock },
    { id: 'qr-codes', label: 'QR Codes 72h', icon: QrCode },
    { id: 'profile', label: 'Mon Profil Validé', icon: Shield }
  ];

  const requests = [
    {
      id: '1',
      items: ['Riz 2kg', 'Lait 4L', 'Pâtes 1kg', 'Pain'],
      status: 'approved',
      submittedAt: '2024-01-15',
      approvedAt: '2024-01-16',
      urgency: 'normal',
      qrGenerated: true,
      validUntil: '2024-01-19',
      remainingHours: 48,
      anonymous: true,
      socialWorker: 'Sophie L.'
    },
    {
      id: '2',
      items: ['Légumes frais', 'Fruits', 'Yaourts', 'Céréales'],
      status: 'pending',
      submittedAt: '2024-01-14',
      urgency: 'high',
      qrGenerated: false,
      anonymous: true,
      socialWorker: 'Sophie L.',
      processingTime: 36
    },
    {
      id: '3',
      items: ['Conserves', 'Huile', 'Sucre', 'Farine'],
      status: 'collected',
      submittedAt: '2024-01-10',
      approvedAt: '2024-01-11',
      collectedAt: '2024-01-12',
      urgency: 'normal',
      qrGenerated: true,
      collectedLocation: 'Restos du Cœur - Marseille'
    },
    {
      id: '4',
      items: ['Produits hygiène', 'Shampooing', 'Dentifrice'],
      status: 'rejected',
      submittedAt: '2024-01-08',
      rejectedAt: '2024-01-09',
      urgency: 'normal',
      rejectionReason: 'Documents manquants - Merci de mettre à jour votre dossier'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-600 border-yellow-200';
      case 'approved': return 'bg-green-100 text-green-600 border-green-200';
      case 'collected': return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'rejected': return 'bg-red-100 text-red-600 border-red-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'En cours de validation';
      case 'approved': return 'Approuvé - QR disponible';
      case 'collected': return 'Retiré avec succès';
      case 'rejected': return 'Non approuvé';
      default: return 'Statut inconnu';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return Clock;
      case 'approved': return CheckCircle;
      case 'collected': return Package;
      case 'rejected': return XCircle;
      default: return Clock;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center text-orange-100 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="mr-2" size={20} />
            Retour aux profils
          </button>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Heart className="mr-4" size={32} />
              <div>
                <h1 className="text-3xl font-bold">Profil Bénéficiaire</h1>
                <p className="text-orange-100">Accompagnement validé • Demandes anonymes • QR sécurisés</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center mb-1">
                <Shield className="mr-2" size={16} />
                <span className="text-sm">Code unique</span>
              </div>
              <div className="text-xl font-bold">PDS-2024-156</div>
              <div className="text-xs text-orange-200">Validé par Sophie L.</div>
            </div>
          </div>
          
          <div className="flex space-x-1 bg-orange-700/50 backdrop-blur-sm rounded-lg p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-2 rounded-md transition-all ${
                    activeTab === tab.id 
                      ? 'bg-white text-orange-600 shadow-sm' 
                      : 'text-orange-100 hover:text-white'
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
        {activeTab === 'requests' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-6">Faire une Nouvelle Demande</h2>
              
              <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-6 mb-6">
                <div className="flex items-center mb-4">
                  <Shield className="text-orange-600 mr-3" size={24} />
                  <h3 className="text-lg font-semibold text-orange-800">Demande anonyme sécurisée</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type de demande
                    </label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                      <option>Aide alimentaire générale</option>
                      <option>Aide d'urgence</option>
                      <option>Produits d'hygiène</option>
                      <option>Produits pour bébé</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Articles souhaités (transmission anonyme)
                    </label>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        'Riz', 'Pâtes', 'Lait', 'Pain', 'Légumes', 'Fruits', 
                        'Conserves', 'Huile', 'Sucre', 'Céréales', 'Yaourts', 'Fromage'
                      ].map((item) => (
                        <label key={item} className="flex items-center">
                          <input type="checkbox" className="mr-2 text-orange-600" />
                          <span>{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Niveau d'urgence
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input type="radio" name="urgency" value="normal" className="mr-2 text-orange-600" defaultChecked />
                        <span>Normal (48-72h)</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="urgency" value="high" className="mr-2 text-orange-600" />
                        <span>Urgent (24h)</span>
                      </label>
                    </div>
                  </div>

                  <div className="bg-white border border-orange-200 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Shield className="text-orange-600 mr-2" size={16} />
                      <span className="font-medium text-orange-800">Protection des données</span>
                    </div>
                    <p className="text-sm text-orange-600">
                      Votre demande sera transmise de manière anonyme aux donateurs. 
                      Seules les informations essentielles (type de famille, besoins) seront partagées.
                    </p>
                  </div>

                  <button className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors flex items-center">
                    <MessageCircle className="mr-2" size={20} />
                    Envoyer la demande anonyme
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Mes Demandes en Cours</h3>
              <div className="space-y-4">
                {requests.filter(req => req.status === 'pending' || req.status === 'approved').map((request) => {
                  const StatusIcon = getStatusIcon(request.status);
                  return (
                    <div key={request.id} className="border-2 border-gray-200 rounded-xl p-6 bg-gradient-to-r from-gray-50 to-orange-50">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <StatusIcon className="text-gray-500 mr-3" size={24} />
                          <div>
                            <h4 className="font-semibold">Demande #{request.id}</h4>
                            <p className="text-sm text-gray-600">Soumise le {request.submittedAt}</p>
                            {request.anonymous && (
                              <div className="flex items-center mt-1">
                                <Shield className="text-orange-500 mr-1" size={12} />
                                <span className="text-xs text-orange-600">Transmise de manière anonyme</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {request.urgency === 'high' && (
                            <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs">
                              Urgent
                            </span>
                          )}
                          <span className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(request.status)}`}>
                            {getStatusText(request.status)}
                          </span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h5 className="font-medium mb-2">Articles demandés:</h5>
                        <div className="flex flex-wrap gap-2">
                          {request.items.map((item, index) => (
                            <span key={index} className="px-3 py-1 bg-white border rounded-full text-sm">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      {request.status === 'pending' && request.processingTime && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                          <div className="flex items-center">
                            <Clock className="text-yellow-600 mr-2" size={16} />
                            <p className="text-yellow-800 text-sm">
                              En cours de traitement par {request.socialWorker} • Délai: {request.processingTime}h
                            </p>
                          </div>
                        </div>
                      )}

                      {request.status === 'approved' && request.qrGenerated && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <CheckCircle className="text-green-600 mr-2" size={20} />
                              <div>
                                <p className="text-green-800 font-medium">
                                  Demande approuvée ! QR code disponible pour retrait.
                                </p>
                                <div className="flex items-center mt-1 text-sm text-green-600">
                                  <Timer className="mr-1" size={12} />
                                  <span>Valide {request.remainingHours}h (jusqu'au {request.validUntil})</span>
                                </div>
                              </div>
                            </div>
                            <QrCode className="text-green-600" size={24} />
                          </div>
                        </div>
                      )}

                      {request.approvedAt && (
                        <p className="text-sm text-green-600 mt-2">
                          ✓ Approuvé le {request.approvedAt} par {request.socialWorker}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg border-2 border-green-200">
                <h3 className="font-semibold text-green-800 mb-2">Colis retirés</h3>
                <p className="text-3xl font-bold text-green-600">8</p>
                <p className="text-sm text-green-600">Ce trimestre</p>
              </div>
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-lg border-2 border-yellow-200">
                <h3 className="font-semibold text-yellow-800 mb-2">En cours</h3>
                <p className="text-3xl font-bold text-yellow-600">2</p>
                <p className="text-sm text-yellow-600">Demandes actives</p>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border-2 border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">Accompagnement</h3>
                <p className="text-3xl font-bold text-blue-600">Sophie L.</p>
                <p className="text-sm text-blue-600">Travailleur social référent</p>
              </div>
              <div className="bg-gradient-to-r from-red-50 to-red-100 p-6 rounded-lg border-2 border-red-200">
                <h3 className="font-semibold text-red-800 mb-2">Rejets</h3>
                <p className="text-3xl font-bold text-red-600">1</p>
                <p className="text-sm text-red-600">Avec motif documenté</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-6">Historique Complet des Demandes</h2>
              
              <div className="space-y-4">
                {requests.map((request) => {
                  const StatusIcon = getStatusIcon(request.status);
                  return (
                    <div key={request.id} className="border-2 border-gray-200 rounded-xl p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <StatusIcon className="text-gray-500 mr-3" size={24} />
                          <div>
                            <h4 className="font-semibold">Demande #{request.id}</h4>
                            <p className="text-sm text-gray-600">Soumise le {request.submittedAt}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(request.status)}`}>
                          {getStatusText(request.status)}
                        </span>
                      </div>

                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {request.items.map((item, index) => (
                            <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="text-sm text-gray-600 space-y-1">
                        {request.approvedAt && (
                          <p className="flex items-center">
                            <CheckCircle className="text-green-500 mr-2" size={14} />
                            Approuvé le {request.approvedAt}
                          </p>
                        )}
                        {request.collectedAt && (
                          <p className="flex items-center">
                            <Package className="text-blue-500 mr-2" size={14} />
                            Retiré le {request.collectedAt}
                            {request.collectedLocation && <span className="ml-1">à {request.collectedLocation}</span>}
                          </p>
                        )}
                        {request.status === 'rejected' && request.rejectionReason && (
                          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-2">
                            <div className="flex items-start">
                              <XCircle className="text-red-500 mr-2 mt-0.5" size={14} />
                              <div>
                                <p className="text-red-800 font-medium text-sm">Motif du refus:</p>
                                <p className="text-red-600 text-sm">{request.rejectionReason}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'qr-codes' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">Mes QR Codes Sécurisés</h2>
            
            <div className="space-y-6">
              {requests.filter(req => req.qrGenerated && req.status === 'approved').map((request) => (
                <div key={request.id} className="border-2 border-green-200 rounded-xl p-6 bg-gradient-to-r from-green-50 to-emerald-50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <QrCode className="text-green-600 mr-3" size={32} />
                      <div>
                        <h3 className="text-lg font-semibold text-green-800">
                          QR Code - Demande #{request.id}
                        </h3>
                        <p className="text-green-600">Valide pour retrait avec géolocalisation</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="w-24 h-24 bg-white border-2 border-green-300 rounded-lg flex items-center justify-center mb-2 shadow-lg">
                        <QrCode size={48} className="text-green-600" />
                      </div>
                      <p className="text-xs text-green-600 font-mono">QR{request.id}2024</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-green-600 mb-1">Articles autorisés:</p>
                      <div className="flex flex-wrap gap-1">
                        {request.items.map((item, index) => (
                          <span key={index} className="px-2 py-1 bg-white text-green-700 rounded text-xs border border-green-200">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-green-600 mb-1">Informations de sécurité:</p>
                      <div className="space-y-1 text-sm text-green-700">
                        <div className="flex items-center">
                          <Timer className="mr-1" size={12} />
                          <span>Valide {request.remainingHours}h (jusqu'au {request.validUntil})</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="mr-1" size={12} />
                          <span>Géolocalisation requise</span>
                        </div>
                        <div className="flex items-center">
                          <Shield className="mr-1" size={12} />
                          <span>Usage unique - Chiffré AES-256</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {request.remainingHours && request.remainingHours < 24 && (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                      <div className="flex items-center">
                        <AlertTriangle className="text-orange-600 mr-2" size={16} />
                        <p className="text-orange-800 font-medium text-sm">
                          Attention: Ce QR code expire dans moins de 24h
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="bg-white border border-green-200 rounded-lg p-4">
                    <h4 className="font-medium text-green-800 mb-2 flex items-center">
                      <MapPin className="mr-2" size={16} />
                      Instructions de retrait:
                    </h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Présentez-vous à l'association avec ce QR code</li>
                      <li>• Géolocalisation automatiquement vérifiée à l'arrivée</li>
                      <li>• Heures d'ouverture: Mar-Jeu 14h-17h, Sam 9h-12h</li>
                      <li>• Adresse: 15 rue de la Solidarité, 13001 Marseille</li>
                      <li>• En cas de problème: 04 91 XX XX XX</li>
                    </ul>
                  </div>
                </div>
              ))}

              {requests.filter(req => req.qrGenerated && req.status === 'approved').length === 0 && (
                <div className="text-center py-12">
                  <QrCode className="mx-auto text-gray-400 mb-4" size={64} />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">Aucun QR code disponible</h3>
                  <p className="text-gray-500">
                    Vos QR codes apparaîtront ici une fois vos demandes approuvées par votre travailleur social référent.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-6">Mon Profil Validé</h2>
              
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6 mb-6">
                <div className="flex items-center mb-4">
                  <Shield className="text-green-600 mr-3" size={24} />
                  <h3 className="text-lg font-semibold text-green-800">Profil vérifié et sécurisé</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Informations validées:</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <CheckCircle className="text-green-500 mr-2" size={16} />
                        <span className="text-sm">Code unique: PDS-2024-156</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="text-green-500 mr-2" size={16} />
                        <span className="text-sm">Documents vérifiés par IA (96% confiance)</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="text-green-500 mr-2" size={16} />
                        <span className="text-sm">Validation CAF confirmée</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="text-green-500 mr-2" size={16} />
                        <span className="text-sm">Géolocalisation autorisée</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Accompagnement:</h4>
                    <div className="bg-white border border-green-200 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <MessageCircle className="text-blue-500 mr-2" size={16} />
                        <span className="font-medium">Sophie L.</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Travailleur social référent</p>
                      <p className="text-xs text-gray-500">
                        Validation effectuée le 12/01/2024<br/>
                        Délai de traitement: 36h
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Sécurité & Confidentialité</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center">
                      <Shield className="text-green-600 mr-2" size={18} />
                      <span className="font-medium">Chiffrement AES-256</span>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">Actif</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center">
                      <FileText className="text-blue-600 mr-2" size={18} />
                      <span className="font-medium">Demandes anonymisées</span>
                    </div>
                    <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">Protégé</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center">
                      <Timer className="text-purple-600 mr-2" size={18} />
                      <span className="font-medium">Conservation 36 mois</span>
                    </div>
                    <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-xs">Conforme</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Mes Droits</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start">
                    <CheckCircle className="text-green-500 mr-2 mt-0.5" size={14} />
                    <span>Droit à l'anonymat dans les demandes</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="text-green-500 mr-2 mt-0.5" size={14} />
                    <span>Accès à l'historique complet de mes demandes</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="text-green-500 mr-2 mt-0.5" size={14} />
                    <span>Motifs documentés en cas de refus</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="text-green-500 mr-2 mt-0.5" size={14} />
                    <span>Accompagnement personnalisé</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="text-green-500 mr-2 mt-0.5" size={14} />
                    <span>QR codes sécurisés avec géolocalisation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BeneficiaryProfile;